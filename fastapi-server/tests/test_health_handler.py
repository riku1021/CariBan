"""ヘルスチェックエンドポイントのテスト

ヘルスチェックエンドポイントが正しく動作することを確認します。
"""

import pytest
from fastapi.testclient import TestClient
from httpx import AsyncClient


class TestHealthEndpoint:
    """ヘルスチェックエンドポイントのテストクラス"""

    def test_health_check_returns_200(self, client: TestClient) -> None:
        """ヘルスチェックが 200 を返すことを確認"""
        response = client.get("/health")

        assert response.status_code == 200

    def test_health_check_returns_healthy_status(self, client: TestClient) -> None:
        """ヘルスチェックが healthy ステータスを返すことを確認"""
        response = client.get("/health")
        data = response.json()

        assert data["status"] == "healthy"
        assert "timestamp" in data

    @pytest.mark.asyncio
    async def test_health_check_async(self, async_client: AsyncClient) -> None:
        """非同期クライアントでヘルスチェックをテスト"""
        response = await async_client.get("/health")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"


class TestTestEndpoint:
    """テストエンドポイントのテストクラス"""

    def test_test_endpoint_returns_200(self, client: TestClient) -> None:
        """/test エンドポイントが 200 を返すことを確認"""
        response = client.get("/test")

        assert response.status_code == 200

    def test_test_endpoint_returns_hello_world(self, client: TestClient) -> None:
        """/test エンドポイントが Hello World を返すことを確認"""
        response = client.get("/test")
        data = response.json()

        assert data["message"] == "Hello World"
