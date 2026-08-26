"""sample モジュールのドメインサービス定義。"""

from .entity import SampleEntity
from .errors import SampleValidationError
from .repository import SampleRepository
from .vo import SampleValueObject


class SampleDomainService:
    """サンプルドメインサービス

    複数のエンティティにまたがるビジネスロジックや、
    単一のエンティティに属さないドメインロジックを実装します。

    使用例:
        service = SampleDomainService(repository)
        is_unique = await service.is_name_unique("新しい名前")
        if is_unique:
            # 名前が一意であれば処理を続行
            pass
    """

    def __init__(self, repository: SampleRepository) -> None:
        """リポジトリでサービスを初期化

        Args:
            repository: サンプルリポジトリ
        """
        self._repository = repository

    async def is_name_unique(self, name: str, exclude_id: str | None = None) -> bool:
        """名前が一意かどうかを確認

        既存のエンティティと名前が重複していないかを確認します。

        Args:
            name: 確認する名前
            exclude_id: 除外するエンティティID（更新時に自分自身を除外）

        Returns:
            名前が一意であれば True

        Example:
            # 新規作成時
            is_unique = await service.is_name_unique("新しい名前")

            # 更新時（自分自身を除外）
            is_unique = await service.is_name_unique("新しい名前", exclude_id="123")
        """
        # 全エンティティを取得して名前を確認
        # 注意: 実際のプロジェクトでは、リポジトリに find_by_name メソッドを追加して
        # データベースレベルで確認することを推奨します
        entities, _ = await self._repository.find_all(limit=1000, offset=0)

        for entity in entities:
            if str(entity.name) == name:
                if exclude_id is not None and entity.id == exclude_id:
                    continue
                return False

        return True

    async def create_with_unique_name(
        self,
        name: str,
        description: str | None = None,
    ) -> SampleEntity:
        """一意な名前でエンティティを作成

        名前の一意性を確認してからエンティティを作成します。

        Args:
            name: エンティティ名
            description: オプションの説明

        Returns:
            作成されたエンティティ

        Raises:
            SampleValidationError: 名前が既に存在する場合
        """
        # 名前の一意性を確認
        if not await self.is_name_unique(name):
            raise SampleValidationError(f"名前 '{name}' は既に存在します")

        # 値オブジェクトを作成
        name_vo = SampleValueObject(name)

        # エンティティを作成
        entity = SampleEntity.create(
            name=name_vo,
            description=description,
        )

        # 永続化
        return await self._repository.create(entity)
