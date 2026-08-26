"""sample モジュールのサンプル取得クエリ。"""

from src.modules.sample.domain import SampleNotFoundError, SampleRepository

from ..dto import GetSampleResponse


class GetSampleQuery:
    """サンプル取得クエリ

    リポジトリを使用してIDでサンプルエンティティを取得します。
    """

    def __init__(self, repository: SampleRepository) -> None:
        """リポジトリでクエリを初期化

        Args:
            repository: データアクセス用のサンプルリポジトリ
        """
        self._repository = repository

    async def execute(self, id: str) -> GetSampleResponse:
        """サンプル取得クエリを実行

        Args:
            id: 取得するサンプルID

        Returns:
            サンプルレスポンス DTO

        Raises:
            SampleNotFoundError: サンプルが見つからない場合
        """
        entity = await self._repository.find_by_id(id)

        if entity is None:
            raise SampleNotFoundError(id)

        return GetSampleResponse(
            id=entity.id,
            name=str(entity.name),
            description=entity.description,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )
