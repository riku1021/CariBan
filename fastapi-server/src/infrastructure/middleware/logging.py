"""ロギングミドルウェア設定

すべての HTTP リクエストとレスポンスをログに記録します。
"""

import time
from collections.abc import Awaitable, Callable

from fastapi import FastAPI, Request, Response

from ..config.settings import load_settings
from ..logger.logger import logger

_HEALTH_PATH = "/health"


def should_skip_access_log(is_production: bool, path: str) -> bool:
    """本番ではヘルスチェックのアクセスログを出さない。"""
    normalized = path if path == "/" else path.rstrip("/")
    return is_production and normalized == _HEALTH_PATH


def setup_logging_middleware(app: FastAPI) -> None:
    """ロギングミドルウェアを設定

    リクエスト完了時に method / path / status / duration を 1 行で記録します。

    Args:
        app: FastAPI アプリケーション
    """

    @app.middleware("http")
    async def log_requests(
        request: Request, call_next: Callable[[Request], Awaitable[Response]]
    ) -> Response:
        """HTTP リクエスト完了をログに記録"""
        settings = load_settings()
        if should_skip_access_log(settings.is_production, request.url.path):
            return await call_next(request)

        started = time.perf_counter()
        response = await call_next(request)
        elapsed_ms = (time.perf_counter() - started) * 1000
        logger.info(
            f"{request.method} {request.url.path} {response.status_code} {elapsed_ms:.1f}ms"
        )
        return response

    logger.debug("ロギングミドルウェアを設定しました")
