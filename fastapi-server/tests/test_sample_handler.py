"""サンプルエンドポイントのテスト - テンプレート例

サンプルエンドポイントのテスト例です。
実際のドメインに合わせて修正してください。

エラーハンドリング方針:
- エラーは例外としてスローされ、グローバル例外ハンドラーで処理される
- レスポンスには success フィールドは含まれない
- エラーレスポンスは { "error": { "code": "...", "message": "...", "type": "..." } } 形式
"""

from fastapi.testclient import TestClient


class TestListSamplesEndpoint:
    """サンプル一覧エンドポイントのテストクラス"""

    def test_list_samples_returns_200(self, client: TestClient) -> None:
        """サンプル一覧が 200 を返すことを確認"""
        response = client.get("/api/samples/")

        assert response.status_code == 200

    def test_list_samples_returns_empty_list(self, client: TestClient) -> None:
        """サンプル一覧が空のリストを返すことを確認（初期状態）"""
        response = client.get("/api/samples/")
        data = response.json()

        assert data["items"] == []
        assert data["total"] == 0

    def test_list_samples_pagination(self, client: TestClient) -> None:
        """ページネーションパラメータが正しく処理されることを確認"""
        response = client.get("/api/samples/?limit=5&offset=10")
        data = response.json()

        assert data["limit"] == 5
        assert data["offset"] == 10


class TestCreateSampleEndpoint:
    """サンプル作成エンドポイントのテストクラス"""

    def test_create_sample_returns_501(self, client: TestClient) -> None:
        """サンプル作成が 501 を返すことを確認（未実装）

        TODO: リポジトリ実装後は 201 を返すように修正
        """
        response = client.post(
            "/api/samples/",
            json={"name": "テストサンプル", "description": "テスト説明"},
        )

        # 現在は未実装のため 501 を返す
        assert response.status_code == 501


class TestGetSampleEndpoint:
    """サンプル取得エンドポイントのテストクラス"""

    def test_get_sample_returns_501(self, client: TestClient) -> None:
        """サンプル取得が 501 を返すことを確認（未実装）

        TODO: リポジトリ実装後は 200 または 404 を返すように修正
        """
        response = client.get("/api/samples/123")

        # 現在は未実装のため 501 を返す
        assert response.status_code == 501


# =============================================================================
# TODO: リポジトリ実装後に以下のテストを追加してください
# =============================================================================
#
# class TestCreateSampleWithRepository:
#     """リポジトリを使用したサンプル作成のテスト"""
#
#     def test_create_sample_success(self, client: TestClient) -> None:
#         """サンプル作成が成功することを確認
#
#         エラーハンドリング方針:
#         - 成功時は 201 Created を返す
#         - レスポンスには id, name, created_at が含まれる
#         - success フィールドは含まれない（エラーは例外で処理）
#         """
#         response = client.post(
#             "/samples/",
#             json={"name": "テストサンプル", "description": "テスト説明"},
#         )
#
#         assert response.status_code == 201
#         data = response.json()
#         assert "id" in data
#         assert data["name"] == "テストサンプル"
#         assert "created_at" in data
#
#     def test_create_sample_validation_error(self, client: TestClient) -> None:
#         """バリデーションエラーが発生することを確認
#
#         空の名前でリクエストすると 400 Bad Request が返される
#         """
#         response = client.post(
#             "/samples/",
#             json={"name": "", "description": "テスト説明"},
#         )
#
#         assert response.status_code == 400
#         data = response.json()
#         assert "error" in data
#         assert data["error"]["type"] == "validation_error"
#
#     def test_create_sample_duplicate_error(self, client: TestClient) -> None:
#         """重複エラーが発生することを確認
#
#         同じ名前で2回作成すると 409 Conflict が返される
#         """
#         # 1回目の作成
#         client.post(
#             "/samples/",
#             json={"name": "重複テスト", "description": "説明"},
#         )
#
#         # 2回目の作成（重複）
#         response = client.post(
#             "/samples/",
#             json={"name": "重複テスト", "description": "説明"},
#         )
#
#         assert response.status_code == 409
#         data = response.json()
#         assert "error" in data
#         assert data["error"]["type"] == "conflict"
#
#
# class TestGetSampleWithRepository:
#     """リポジトリを使用したサンプル取得のテスト"""
#
#     def test_get_sample_success(self, client: TestClient) -> None:
#         """サンプル取得が成功することを確認"""
#         # まずサンプルを作成
#         create_response = client.post(
#             "/samples/",
#             json={"name": "取得テスト", "description": "説明"},
#         )
#         sample_id = create_response.json()["id"]
#
#         # 作成したサンプルを取得
#         response = client.get(f"/samples/{sample_id}")
#
#         assert response.status_code == 200
#         data = response.json()
#         assert data["id"] == sample_id
#         assert data["name"] == "取得テスト"
#
#     def test_get_sample_not_found(self, client: TestClient) -> None:
#         """存在しないサンプルで 404 が返されることを確認
#
#         例外はグローバル例外ハンドラーで処理され、
#         標準的なエラーレスポンス形式で返される
#         """
#         response = client.get("/samples/nonexistent-id")
#
#         assert response.status_code == 404
#         data = response.json()
#         assert "error" in data
#         assert data["error"]["code"] == "SAMPLE_NOT_FOUND"
#         assert data["error"]["type"] == "not_found"
# =============================================================================
