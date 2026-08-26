"""アプリケーション設定（Pydantic Settings 使用）

環境変数は .env ファイルから読み込まれ、検証されます。
環境に応じて envs/.env.dev または envs/.env.prod を読み込みます。

使用方法:
    ENV=dev または ENV=prod 環境変数を設定して環境を切り替えます。
    デフォルトは dev です。
"""

import os
from functools import lru_cache
from pathlib import Path
from typing import Self

from pydantic import Field, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

_VALID_LOG_LEVELS = frozenset({"DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"})


class ServerConfig(BaseSettings):
    """サーバー設定

    標準的なサーバー設定です。通常は変更不要です。
    """

    host: str = Field(default="0.0.0.0", alias="HOST")
    port: int = Field(default=8000, alias="PORT")
    read_timeout: int = Field(default=30, alias="READ_TIMEOUT")
    write_timeout: int = Field(default=30, alias="WRITE_TIMEOUT")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


class SecurityHeadersConfig(BaseSettings):
    """セキュリティヘッダー設定

    OWASP推奨のセキュリティヘッダーを制御するための設定です。
    """

    # HSTS（HTTP Strict Transport Security）設定
    enable_hsts: bool = Field(default=False, alias="ENABLE_HSTS")
    hsts_max_age: int = Field(default=31536000, alias="HSTS_MAX_AGE")  # 1年
    hsts_include_subdomains: bool = Field(default=True, alias="HSTS_INCLUDE_SUBDOMAINS")

    # Content-Security-Policy 設定（API向けのデフォルト）
    csp_policy: str = Field(
        default="default-src 'self'; script-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';",
        alias="CSP_POLICY",
    )

    # Permissions-Policy 設定（API向けのデフォルト：主要なブラウザ機能を無効化）
    permissions_policy: str = Field(
        default=(
            "geolocation=(), microphone=(), camera=(), "
            "payment=(), usb=(), magnetometer=(), accelerometer=(), "
            "gyroscope=(), fullscreen=(self), autoplay=()"
        ),
        alias="PERMISSIONS_POLICY",
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


# =============================================================================
# カスタム設定クラス
# =============================================================================
# 例: 外部API設定
#
# class ExternalAPIConfig(BaseSettings):
#     """外部API設定"""
#
#     api_key: str = Field(alias="EXTERNAL_API_KEY")
#     base_url: str = Field(default="https://api.example.com", alias="EXTERNAL_API_URL")
#
#     model_config = SettingsConfigDict(
#         env_file=".env",
#         env_file_encoding="utf-8",
#         case_sensitive=False,
#         extra="ignore",
#     )
#
class DatabaseConfig(BaseSettings):
    """データベース設定"""

    database_url: str = Field(
        default="postgresql+asyncpg://app:app@localhost:5432/cariban",
        alias="DATABASE_URL",
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


# =============================================================================


class Settings(BaseSettings):
    """アプリケーション設定

    環境変数から設定を読み込みます。
    アプリケーションに必要な設定値ごとにフィールドを追加してください。
    """

    # サーバー設定（標準 - 通常は変更不要）
    env: str = Field(default="dev", alias="ENV")
    log_level: str = Field(default="", alias="LOG_LEVEL")
    host: str = Field(default="0.0.0.0", alias="HOST")
    port: int = Field(default=8000, alias="PORT")
    read_timeout: int = Field(default=30, alias="READ_TIMEOUT")
    write_timeout: int = Field(default=30, alias="WRITE_TIMEOUT")

    # セキュリティヘッダー設定
    enable_hsts: bool = Field(default=False, alias="ENABLE_HSTS")
    hsts_max_age: int = Field(default=31536000, alias="HSTS_MAX_AGE")
    hsts_include_subdomains: bool = Field(default=True, alias="HSTS_INCLUDE_SUBDOMAINS")
    csp_policy: str = Field(
        default="default-src 'self'; script-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';",
        alias="CSP_POLICY",
    )
    permissions_policy: str = Field(
        default=(
            "geolocation=(), microphone=(), camera=(), "
            "payment=(), usb=(), magnetometer=(), accelerometer=(), "
            "gyroscope=(), fullscreen=(self), autoplay=()"
        ),
        alias="PERMISSIONS_POLICY",
    )

    database_url: str = Field(
        default="postgresql+asyncpg://app:app@localhost:5432/cariban",
        alias="DATABASE_URL",
        description="SQLAlchemy async URL",
    )

    # ==========================================================================
    # TODO: 以下に設定フィールドを追加してください
    # ==========================================================================
    #
    # フィールドの例:
    #
    # # 外部API設定
    # external_api_key: str = Field(alias="EXTERNAL_API_KEY")
    # external_api_url: str = Field(default="https://api.example.com", alias="EXTERNAL_API_URL")
    # ==========================================================================

    model_config = SettingsConfigDict(
        env_file=None,  # load_settings()で動的に設定
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def is_production(self) -> bool:
        """本番環境かどうか。"""
        return self.env.lower() == "prod"

    @field_validator("log_level", mode="before")
    @classmethod
    def normalize_log_level(cls, value: object) -> str:
        """LOG_LEVEL を正規化する。未知値（暗号化のまま等）は空にして後段で既定化する。"""
        if value is None:
            return ""
        normalized = str(value).strip().upper()
        if normalized in {"", "NONE"}:
            return ""
        if normalized not in _VALID_LOG_LEVELS:
            return ""
        return normalized

    @model_validator(mode="after")
    def apply_default_log_level(self) -> Self:
        if self.log_level == "":
            self.log_level = "INFO" if self.is_production else "DEBUG"
        return self

    def get_server_config(self) -> ServerConfig:
        """サーバー設定を取得

        Returns:
            サーバー設定
        """
        return ServerConfig.model_validate(
            {
                "HOST": self.host,
                "PORT": self.port,
                "READ_TIMEOUT": self.read_timeout,
                "WRITE_TIMEOUT": self.write_timeout,
            }
        )

    def get_security_headers_config(self) -> SecurityHeadersConfig:
        """セキュリティヘッダー設定を取得

        Returns:
            セキュリティヘッダー設定
        """
        return SecurityHeadersConfig.model_validate(
            {
                "ENABLE_HSTS": self.enable_hsts,
                "HSTS_MAX_AGE": self.hsts_max_age,
                "HSTS_INCLUDE_SUBDOMAINS": self.hsts_include_subdomains,
                "CSP_POLICY": self.csp_policy,
                "PERMISSIONS_POLICY": self.permissions_policy,
            }
        )

    # ==========================================================================
    # TODO: カスタム設定用のゲッターメソッドを追加してください
    # ==========================================================================
    #
    # def get_external_api_config(self) -> ExternalAPIConfig:
    #     """外部API設定を取得"""
    #     return ExternalAPIConfig.model_validate({
    #         "EXTERNAL_API_KEY": self.external_api_key,
    #         "EXTERNAL_API_URL": self.external_api_url,
    #     })
    #
    def get_database_config(self) -> DatabaseConfig:
        """データベース設定を取得"""
        return DatabaseConfig.model_validate(
            {
                "DATABASE_URL": self.database_url,
            }
        )

    # ==========================================================================


def _uses_dotenvx() -> bool:
    """dotenvx run 経由で環境変数が注入済みかどうか"""
    return any(
        os.getenv(key)
        for key in (
            "DOTENV_PRIVATE_KEY",
            "DOTENV_PRIVATE_KEY_DEV",
            "DOTENV_PRIVATE_KEY_PROD",
        )
    )


def _is_dotenvx_encrypted(path: Path) -> bool:
    """dotenvx の暗号文ファイルかどうか。Pydantic は encrypted: 値を解釈できない。"""
    try:
        sample = path.read_text(encoding="utf-8")[:2000]
    except OSError:
        return False
    return "encrypted:" in sample or "DOTENV_PUBLIC_KEY" in sample


def get_env_file_path() -> list[str]:
    """環境に応じた.envファイルのパスを取得

    ENV環境変数で環境を判定し、以下の順序でファイルを読み込みます：
    1. .env（共通設定、存在する場合）
    2. envs/.env.{ENV}（環境固有設定、存在する場合）

    環境変数の優先順位：
    - 環境固有ファイル（envs/.env.{ENV}）が最優先
    - .envファイルが次に優先
    - 環境変数が最後に優先

    Returns:
        読み込む.envファイルのパスリスト

    Examples:
        ENV=dev の場合: [".env", "envs/.env.dev"]
        ENV=prod の場合: [".env", "envs/.env.prod"]
    """
    env = os.getenv("ENV", "dev").lower()

    if _uses_dotenvx():
        return []

    env_files = []

    # 共通設定ファイル（存在する場合。暗号文は dotenvx 注入時のみ有効）
    if Path(".env").exists() and not _is_dotenvx_encrypted(Path(".env")):
        env_files.append(".env")

    # 環境固有設定ファイル（存在する場合）
    env_specific_file = Path(f"envs/.env.{env}")
    if env_specific_file.exists() and not _is_dotenvx_encrypted(env_specific_file):
        env_files.append(str(env_specific_file))

    return env_files


@lru_cache(maxsize=1)
def load_settings() -> Settings:
    """アプリケーション設定を読み込む。

    同一プロセスでは初回のみファイル/環境変数を読み、以降はキャッシュを返す
    （uvicorn --reload の import と lifespan で二重ログになるのを防ぐ）。
    テストで ENV を差し替える場合は load_settings.cache_clear() を呼ぶ。

    環境に応じて適切な.envファイルを読み込みます。
    ENV環境変数で環境を指定してください（dev/prod、デフォルト: dev）。

    読み込み順序（後から読み込んだものが優先）：
    1. .env（共通設定、存在する場合）
    2. envs/.env.{ENV}（環境固有設定、存在する場合）
    3. 環境変数（最優先）

    Returns:
        アプリケーション設定

    Raises:
        ValidationError: 必須の環境変数が設定されていない場合

    Examples:
        # 開発環境
        ENV=dev python src/main.py
        # → .env と envs/.env.dev を読み込み

        # 本番環境
        ENV=prod python src/main.py
        # → .env と envs/.env.prod を読み込み
    """
    env_files = get_env_file_path()
    env = os.getenv("ENV", "dev").lower()

    # 環境固有の設定クラスを作成（env_fileを動的に設定）
    class EnvironmentSettings(Settings):
        model_config = SettingsConfigDict(
            env_file=env_files if env_files else None,
            env_file_encoding="utf-8",
            case_sensitive=False,
            extra="ignore",
        )

    settings = EnvironmentSettings()

    from ...infrastructure.logger.logger import configure_logger, logger

    configure_logger(settings.log_level)

    encrypted_env = Path(f"envs/.env.{env}")
    if env_files:
        logger.debug(f"環境: {env}")
        logger.debug(f"読み込んだ設定ファイル: {', '.join(env_files)}")
    elif _uses_dotenvx():
        logger.debug(f"環境: {env} - dotenvx が注入した環境変数から読み込みます")
    elif encrypted_env.exists() and _is_dotenvx_encrypted(encrypted_env):
        logger.debug(
            f"環境: {env} - 暗号化された {encrypted_env} は dotenvx run 経由でのみ読み込みます"
        )
    else:
        logger.warning(
            f"環境: {env} - .envファイルが見つかりません。環境変数からのみ読み込みます。"
        )

    return settings
