"""user モジュールのユーザーリポジトリインターフェース定義。"""

from abc import ABC, abstractmethod

from .entity import User
from .vo import Email


class UserRepository(ABC):
    """ユーザーリポジトリインターフェース

    これはドメインが定義するポート（インターフェース）です。
    実装はアダプター層で提供されます。

    注意:
    - User（Aggregate Root）のみを対象とします
    - UserProfile は User と一緒に永続化されます
    """

    @abstractmethod
    async def create(self, user: User) -> User:
        """新しいユーザーを作成

        Args:
            user: 作成するユーザー

        Returns:
            IDが割り当てられた作成済みユーザー

        Raises:
            RepositoryOperationError: 作成に失敗した場合
            DuplicateEmailError: メールアドレスが既に存在する場合
        """
        raise NotImplementedError

    @abstractmethod
    async def find_by_id(self, id: str) -> User | None:
        """IDでユーザーを検索

        Args:
            id: ユーザーID

        Returns:
            見つかった場合はユーザー、そうでなければ None

        Raises:
            RepositoryOperationError: 操作に失敗した場合
        """
        raise NotImplementedError

    @abstractmethod
    async def find_by_email(self, email: Email) -> User | None:
        """メールアドレスでユーザーを検索

        Args:
            email: メールアドレス

        Returns:
            見つかった場合はユーザー、そうでなければ None

        Raises:
            RepositoryOperationError: 操作に失敗した場合
        """
        raise NotImplementedError

    @abstractmethod
    async def find_all(
        self,
        limit: int = 10,
        offset: int = 0,
    ) -> tuple[list[User], int]:
        """ページネーション付きで全ユーザーを検索

        Args:
            limit: 返すユーザーの最大数
            offset: スキップするユーザーの数

        Returns:
            （ユーザーのリスト、総数）のタプル

        Raises:
            RepositoryOperationError: 操作に失敗した場合
        """
        raise NotImplementedError

    @abstractmethod
    async def update(self, user: User) -> None:
        """既存のユーザーを更新

        注意: UserProfile も一緒に更新されます。

        Args:
            user: 更新するユーザー（IDが必要）

        Raises:
            UserNotFoundError: ユーザーが見つからない場合
            RepositoryOperationError: 更新に失敗した場合
        """
        raise NotImplementedError

    @abstractmethod
    async def delete(self, id: str) -> None:
        """ユーザーを削除

        注意: UserProfile も一緒に削除されます。

        Args:
            id: 削除するユーザーのID

        Raises:
            UserNotFoundError: ユーザーが見つからない場合
            RepositoryOperationError: 削除に失敗した場合
        """
        raise NotImplementedError

    @abstractmethod
    async def exists_by_email(self, email: Email) -> bool:
        """メールアドレスが存在するかどうかを確認

        Args:
            email: 確認するメールアドレス

        Returns:
            存在すれば True

        Raises:
            RepositoryOperationError: 操作に失敗した場合
        """
        raise NotImplementedError
