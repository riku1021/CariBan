"""sample モジュールのサンプル一覧クエリ。"""

from src.modules.sample.domain import SampleRepository

from ..dto import ListSamplesRequest, ListSamplesResponse, SampleItem


class ListSamplesQuery:
    """サンプル一覧クエリ

    リポジトリを使用してページネーション付きのサンプル一覧を取得します。
    """

    def __init__(self, repository: SampleRepository) -> None:
        """リポジトリでクエリを初期化

        Args:
            repository: データアクセス用のサンプルリポジトリ
        """
        self._repository = repository

    async def execute(self, request: ListSamplesRequest) -> ListSamplesResponse:
        """サンプル一覧クエリを実行

        Args:
            request: ページネーションパラメータを含む一覧リクエスト DTO

        Returns:
            アイテムと総数を含む一覧レスポンス DTO
        """
        entities, total = await self._repository.find_all(
            limit=request.limit,
            offset=request.offset,
        )

        items = [
            SampleItem(
                id=entity.id,
                name=str(entity.name),
                created_at=entity.created_at,
            )
            for entity in entities
        ]

        return ListSamplesResponse(
            items=items,
            total=total,
            limit=request.limit,
            offset=request.offset,
        )
