"""ログレベルとアクセスログ方針のテスト。"""

import logging
from collections.abc import Generator
from unittest.mock import patch

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from src.infrastructure.config.settings import Settings, load_settings
from src.infrastructure.logger.logger import configure_logger, logger, parse_log_level
from src.infrastructure.middleware.logging import should_skip_access_log
from src.shared.domain import OperationError
from src.shared.http.exception_handlers import setup_exception_handlers


@pytest.fixture(autouse=True)
def _reset_settings_cache() -> Generator[None]:
    load_settings.cache_clear()
    yield
    load_settings.cache_clear()


class TestLogLevel:
    def test_parse_log_level_known_names(self) -> None:
        assert parse_log_level("WARNING") == logging.WARNING
        assert parse_log_level("debug") == logging.DEBUG

    def test_parse_log_level_unknown_falls_back_to_info(self) -> None:
        assert parse_log_level("WARN") == logging.INFO

    def test_configure_logger_sets_level(self) -> None:
        configure_logger("ERROR")
        assert logger.level == logging.ERROR
        configure_logger("DEBUG")
        assert logger.level == logging.DEBUG

    def test_dev_defaults_to_debug(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("ENV", "dev")
        monkeypatch.delenv("LOG_LEVEL", raising=False)
        assert Settings().log_level == "DEBUG"
        assert not Settings().is_production

    def test_prod_defaults_to_info(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("ENV", "prod")
        monkeypatch.delenv("LOG_LEVEL", raising=False)
        assert Settings().log_level == "INFO"
        assert Settings().is_production

    def test_explicit_log_level_wins(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("ENV", "prod")
        monkeypatch.setenv("LOG_LEVEL", "ERROR")
        assert Settings().log_level == "ERROR"

    def test_unknown_log_level_falls_back(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("ENV", "dev")
        monkeypatch.setenv("LOG_LEVEL", "encrypted:abc")
        assert Settings().log_level == "DEBUG"

    def test_warn_is_not_an_alias(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("ENV", "dev")
        monkeypatch.setenv("LOG_LEVEL", "WARN")
        assert Settings().log_level == "DEBUG"

    def test_encrypted_env_files_are_not_loaded_without_dotenvx(self) -> None:
        from src.infrastructure.config.settings import get_env_file_path

        assert get_env_file_path() == []


class TestAccessLogSkip:
    def test_skips_health_in_production(self) -> None:
        assert should_skip_access_log(True, "/health")
        assert should_skip_access_log(True, "/health/")

    def test_keeps_health_in_development(self) -> None:
        assert not should_skip_access_log(False, "/health")

    def test_keeps_other_paths_in_production(self) -> None:
        assert not should_skip_access_log(True, "/test")
        assert not should_skip_access_log(True, "/")


class TestInternalErrorMessage:
    def test_operation_error_hides_details_in_prod(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("ENV", "prod")
        app = FastAPI()
        setup_exception_handlers(app)

        @app.get("/boom")
        def boom() -> None:
            raise OperationError("secret internals")

        client = TestClient(app, raise_server_exceptions=False)
        response = client.get("/boom")

        assert response.status_code == 500
        assert response.json()["error"]["message"] == "内部サーバーエラーが発生しました"

    def test_operation_error_shows_details_in_dev(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("ENV", "dev")
        app = FastAPI()
        setup_exception_handlers(app)

        @app.get("/boom")
        def boom() -> None:
            raise OperationError("secret internals")

        client = TestClient(app, raise_server_exceptions=False)
        response = client.get("/boom")

        assert response.status_code == 500
        assert response.json()["error"]["message"] == "secret internals"


class TestAccessLogEmitsSingleLine:
    def test_request_logs_one_info_line(self) -> None:
        app = FastAPI()
        from src.infrastructure.middleware.logging import setup_logging_middleware

        setup_logging_middleware(app)

        @app.get("/ping")
        def ping() -> dict[str, str]:
            return {"ok": "yes"}

        with patch("src.infrastructure.middleware.logging.logger") as mock_logger:
            TestClient(app).get("/ping")

        info_messages = [call.args[0] for call in mock_logger.info.call_args_list]
        assert len(info_messages) == 1
        assert info_messages[0].startswith("GET /ping 200 ")
        assert info_messages[0].endswith("ms")
