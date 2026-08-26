"""FastAPI ルーター設定

アプリケーション共通のルーター設定を提供します。
ミドルウェアの設定は infrastructure 層で管理されます。
"""

from fastapi import FastAPI

from ...infrastructure.middleware import setup_middleware


def setup_router(app: FastAPI) -> None:
    """FastAPI ルーターを設定

    ミドルウェアの設定は infrastructure 層で行われます。
    この関数は HTTP アダプター層から infrastructure 層への
    エントリーポイントとして機能します。

    Args:
        app: FastAPI アプリケーション
    """
    # ミドルウェアを設定（infrastructure 層で管理）
    setup_middleware(app)
