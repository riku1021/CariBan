"""sample モジュールのリポジトリインターフェース定義。"""

from abc import ABC, abstractmethod

from .entity import SampleEntity


class SampleRepository(ABC):
    """サンプルリポジトリインターフェース

    これはドメインが定義するポート（インターフェース）です。
    実装はアダプター層で提供されます。

    ドメインが必要とするデータ操作を表すメソッドを定義してください。
    """

    @abstractmethod
    async def create(self, entity: SampleEntity) -> SampleEntity:
        """新しいエンティティを作成

        Args:
            entity: 作成するエンティティ

        Returns:
            IDが割り当てられた作成済みエンティティ

        Raises:
            RepositoryOperationError: 作成に失敗した場合
            DuplicateEntityError: エンティティが既に存在する場合
        """
        raise NotImplementedError

    @abstractmethod
    async def find_by_id(self, id: str) -> SampleEntity | None:
        """IDでエンティティを検索

        Args:
            id: エンティティID

        Returns:
            見つかった場合はエンティティ、そうでなければ None

        Raises:
            RepositoryOperationError: 操作に失敗した場合
        """
        raise NotImplementedError

    @abstractmethod
    async def find_all(
        self,
        limit: int = 10,
        offset: int = 0,
    ) -> tuple[list[SampleEntity], int]:
        """ページネーション付きで全エンティティを検索

        Args:
            limit: 返すエンティティの最大数
            offset: スキップするエンティティの数

        Returns:
            （エンティティのリスト、総数）のタプル

        Raises:
            RepositoryOperationError: 操作に失敗した場合
        """
        raise NotImplementedError

    @abstractmethod
    async def update(self, entity: SampleEntity) -> None:
        """既存のエンティティを更新

        Args:
            entity: 更新するエンティティ（IDが必要）

        Raises:
            SampleNotFoundError: エンティティが見つからない場合
            RepositoryOperationError: 更新に失敗した場合
        """
        raise NotImplementedError

    @abstractmethod
    async def delete(self, id: str) -> None:
        """エンティティを削除

        Args:
            id: 削除するエンティティのID

        Raises:
            SampleNotFoundError: エンティティが見つからない場合
            RepositoryOperationError: 削除に失敗した場合
        """
        raise NotImplementedError
