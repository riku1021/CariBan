"""セキュリティヘッダーミドルウェア設定

OWASP推奨のセキュリティヘッダーをすべてのレスポンスに追加します。
"""

from collections.abc import Awaitable, Callable

from fastapi import FastAPI, Request, Response

from ..config.settings import SecurityHeadersConfig
from ..logger.logger import logger


def setup_security_headers(app: FastAPI, config: SecurityHeadersConfig) -> None:
    """セキュリティヘッダーミドルウェアを設定

    OWASP推奨のセキュリティヘッダーをすべてのレスポンスに追加します。

    設定されるヘッダー:
    - X-Content-Type-Options: nosniff（常に設定）
    - Referrer-Policy: strict-origin-when-cross-origin（常に設定）
    - Content-Security-Policy: 環境変数で設定可能（API向けのデフォルト、frame-ancestors含む）
    - Permissions-Policy: 環境変数で設定可能（API向けのデフォルト）
    - Strict-Transport-Security: 環境変数で有効化（HTTPS環境のみ推奨）

    Args:
        app: FastAPI アプリケーション
        config: セキュリティヘッダー設定
    """

    @app.middleware("http")
    async def security_headers_middleware(
        request: Request, call_next: Callable[[Request], Awaitable[Response]]
    ) -> Response:
        """セキュリティヘッダーをレスポンスに追加"""
        response = await call_next(request)

        # 常に設定するヘッダー
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"] = config.csp_policy
        response.headers["Permissions-Policy"] = config.permissions_policy

        # HSTS（環境変数で制御、HTTPS環境のみ推奨）
        if config.enable_hsts:
            hsts_value = f"max-age={config.hsts_max_age}"
            if config.hsts_include_subdomains:
                hsts_value += "; includeSubDomains"
            response.headers["Strict-Transport-Security"] = hsts_value

        return response

    logger.debug("セキュリティヘッダーミドルウェアを設定しました")
