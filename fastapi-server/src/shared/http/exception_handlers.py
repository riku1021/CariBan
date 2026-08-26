"""グローバル例外ハンドラー（shared/http）。

FastAPI アプリケーション全体で発生する例外を統一的に処理します。
ドメインエラーを適切な HTTP レスポンスに変換し、
予期しないエラーも安全に処理します。
"""

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import ValidationError as PydanticValidationError

from src.infrastructure.config.settings import load_settings
from src.infrastructure.logger.logger import logger
from src.shared.domain import (
    ConflictError,
    DomainError,
    ForbiddenError,
    NotFoundError,
    OperationError,
    UnauthorizedError,
    ValidationError,
)

_INTERNAL_ERROR_MESSAGE = "内部サーバーエラーが発生しました"


def _internal_error_message(original: str) -> str:
    """本番では 500 の詳細をクライアントに返さない。"""
    if load_settings().is_production:
        return _INTERNAL_ERROR_MESSAGE
    return original


def setup_exception_handlers(app: FastAPI) -> None:
    """FastAPI アプリケーションに例外ハンドラーを登録。

    Args:
        app: FastAPI アプリケーション
    """

    @app.exception_handler(ValidationError)
    async def validation_error_handler(request: Request, exc: ValidationError) -> JSONResponse:
        """バリデーションエラーハンドラー

        HTTP ステータスコード: 400 Bad Request
        """
        logger.warning(f"Validation error: {exc.message} - {request.url.path}")
        return JSONResponse(
            status_code=400,
            content={
                "error": {
                    "code": exc.error_code,
                    "message": exc.message,
                    "type": "validation_error",
                }
            },
        )

    @app.exception_handler(NotFoundError)
    async def not_found_error_handler(request: Request, exc: NotFoundError) -> JSONResponse:
        """NotFound エラーハンドラー

        HTTP ステータスコード: 404 Not Found
        """
        logger.warning(f"Not found: {exc.message} - {request.url.path}")
        return JSONResponse(
            status_code=404,
            content={
                "error": {
                    "code": exc.error_code,
                    "message": exc.message,
                    "type": "not_found",
                }
            },
        )

    @app.exception_handler(ConflictError)
    async def conflict_error_handler(request: Request, exc: ConflictError) -> JSONResponse:
        """競合エラーハンドラー

        HTTP ステータスコード: 409 Conflict
        """
        logger.warning(f"Conflict: {exc.message} - {request.url.path}")
        return JSONResponse(
            status_code=409,
            content={
                "error": {
                    "code": exc.error_code,
                    "message": exc.message,
                    "type": "conflict",
                }
            },
        )

    @app.exception_handler(UnauthorizedError)
    async def unauthorized_error_handler(request: Request, exc: UnauthorizedError) -> JSONResponse:
        """認証エラーハンドラー

        HTTP ステータスコード: 401 Unauthorized
        """
        logger.warning(f"Unauthorized: {exc.message} - {request.url.path}")
        return JSONResponse(
            status_code=401,
            content={
                "error": {
                    "code": exc.error_code,
                    "message": exc.message,
                    "type": "unauthorized",
                }
            },
        )

    @app.exception_handler(ForbiddenError)
    async def forbidden_error_handler(request: Request, exc: ForbiddenError) -> JSONResponse:
        """権限エラーハンドラー

        HTTP ステータスコード: 403 Forbidden
        """
        logger.warning(f"Forbidden: {exc.message} - {request.url.path}")
        return JSONResponse(
            status_code=403,
            content={
                "error": {
                    "code": exc.error_code,
                    "message": exc.message,
                    "type": "forbidden",
                }
            },
        )

    @app.exception_handler(OperationError)
    async def operation_error_handler(request: Request, exc: OperationError) -> JSONResponse:
        """操作エラーハンドラー

        HTTP ステータスコード: 500 Internal Server Error
        """
        logger.error(f"Operation error: {exc.message} - {request.url.path}")
        return JSONResponse(
            status_code=500,
            content={
                "error": {
                    "code": exc.error_code,
                    "message": _internal_error_message(exc.message),
                    "type": "operation_error",
                }
            },
        )

    @app.exception_handler(DomainError)
    async def domain_error_handler(request: Request, exc: DomainError) -> JSONResponse:
        """ドメインエラーハンドラー（フォールバック）

        上記で処理されなかったドメインエラーをキャッチします。
        HTTP ステータスコード: 400 Bad Request
        """
        logger.warning(f"Domain error: {exc.message} - {request.url.path}")
        return JSONResponse(
            status_code=400,
            content={
                "error": {
                    "code": exc.error_code,
                    "message": exc.message,
                    "type": "domain_error",
                }
            },
        )

    @app.exception_handler(PydanticValidationError)
    async def pydantic_validation_error_handler(
        request: Request, exc: PydanticValidationError
    ) -> JSONResponse:
        """Pydantic バリデーションエラーハンドラー

        リクエストボディのバリデーションエラーを処理します。
        HTTP ステータスコード: 422 Unprocessable Entity
        """
        logger.warning(f"Pydantic validation error: {exc.errors()} - {request.url.path}")
        return JSONResponse(
            status_code=422,
            content={
                "error": {
                    "code": "VALIDATION_ERROR",
                    "message": "リクエストデータの検証に失敗しました",
                    "type": "validation_error",
                    "details": exc.errors(),
                }
            },
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        """一般例外ハンドラー（フォールバック）

        予期しない例外をキャッチし、安全なエラーレスポンスを返します。
        本番環境では内部エラーの詳細を隠蔽します。

        HTTP ステータスコード: 500 Internal Server Error
        """
        logger.exception(f"Unexpected error: {exc} - {request.url.path}")

        return JSONResponse(
            status_code=500,
            content={
                "error": {
                    "code": "INTERNAL_ERROR",
                    "message": _internal_error_message(str(exc)),
                    "type": "internal_error",
                }
            },
        )

    logger.debug("例外ハンドラーを登録しました")
