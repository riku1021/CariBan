"""アプリケーションのルーター集約ポイント。

modules.<context>.adapters.http などからルーターを集約し、FastAPI アプリに登録
"""

from fastapi import FastAPI

from src.modules.health.adapters.http import router as health_router
from src.modules.sample.adapters.http import router as sample_router
from src.modules.user.adapters.http import router as user_router


def include_routers(app: FastAPI) -> None:
    """FastAPI アプリケーションにルーターを登録"""
    app.include_router(health_router)
    app.include_router(sample_router, prefix="/api")
    app.include_router(user_router, prefix="/api")
