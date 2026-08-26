"""FastAPI アプリケーション組み立てロジック。

bootstrap レイヤとして、アプリケーションの生成・ミドルウェア登録・
ルーター登録・例外ハンドラー登録などの Imperative Shell をここに集約します。
"""

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from pydantic import BaseModel

from src.adapter.http.dependencies import cleanup_dependencies, initialize_dependencies
from src.adapter.http.router import setup_router
from src.infrastructure.config.settings import load_settings
from src.infrastructure.logger.logger import logger
from src.shared.http.exception_handlers import setup_exception_handlers

from .router_registry import include_routers


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    """アプリケーションライフサイクルコンテキストマネージャー。

    起動とシャットダウンイベントを処理します。
    """
    # 起動
    settings = load_settings()
    logger.info(
        f"FastAPI アプリケーションを起動しています host={settings.host} port={settings.port}"
    )

    initialize_dependencies(settings)
    logger.debug("依存関係を初期化しました")

    try:
        yield
    finally:
        logger.info("FastAPI アプリケーションをシャットダウンしています...")
        await cleanup_dependencies()
        logger.debug("クリーンアップが完了しました")


def create_app() -> FastAPI:
    """FastAPI アプリケーションを生成する。

    Returns:
        構成済みの FastAPI アプリケーション
    """
    app = FastAPI(
        title="CariBan API",
        description="Panda CSS + FastAPI のフルスタックテンプレート API",
        version="0.1.0",
        lifespan=lifespan,
    )

    # ミドルウェアの設定（infrastructure 層のエントリポイント）
    setup_router(app)

    # グローバル例外ハンドラーの登録
    setup_exception_handlers(app)

    # 各ハンドラー（modules.<context>.adapters.http）からルーターを集約
    include_routers(app)

    # テスト用エンドポイント（テンプレート用の簡易ヘルスチェック）
    class TestResponseModel(BaseModel):
        message: str

    @app.get("/test")
    async def test() -> TestResponseModel:
        return TestResponseModel(message="Hello World")

    return app
