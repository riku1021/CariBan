"""pytest フィクスチャ設定

テスト全体で使用するフィクスチャを定義します。
"""

from collections.abc import AsyncGenerator

import pytest
from fastapi.testclient import TestClient
from httpx import ASGITransport, AsyncClient

from src.main import app


@pytest.fixture
def client() -> TestClient:
    """同期テストクライアント

    FastAPI アプリケーションの同期テストに使用します。

    Yields:
        TestClient: テストクライアント

    Example:
        def test_health(client):
            response = client.get("/health")
            assert response.status_code == 200
    """
    return TestClient(app)


@pytest.fixture
async def async_client() -> AsyncGenerator[AsyncClient]:
    """非同期テストクライアント

    FastAPI アプリケーションの非同期テストに使用します。

    Yields:
        AsyncClient: 非同期テストクライアント

    Example:
        async def test_health(async_client):
            response = await async_client.get("/health")
            assert response.status_code == 200
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


# =============================================================================
# TODO: 必要に応じてフィクスチャを追加してください
# =============================================================================
#
# 例: モックリポジトリフィクスチャ
#
# @pytest.fixture
# def mock_sample_repo():
#     """モックサンプルリポジトリ"""
#     from unittest.mock import AsyncMock
#     from src.modules.sample.domain import SampleRepository
#
#     mock = AsyncMock(spec=SampleRepository)
#     return mock
#
# 例: テストデータベースフィクスチャ
#
# @pytest.fixture
# async def test_db():
#     """テスト用データベース接続"""
#     # データベース接続を作成
#     # テスト終了後にクリーンアップ
#     pass
# =============================================================================
