"""user モジュールのドメインサービス定義。"""

from .entity import User
from .errors import DuplicateEmailError
from .repository import UserRepository
from .vo import Email, UserName


class UserDomainService:
    """ユーザードメインサービス

    複数のエンティティやリポジトリを使用するビジネスロジックを実装します。
    特に、メールアドレスの一意性チェックなど、リポジトリへのアクセスが
    必要な操作を提供します。

    使用例:
        service = UserDomainService(repository)
        user = await service.create_user(
            email=Email("user@example.com"),
            name=UserName(first_name="太郎", last_name="山田"),
        )
    """

    def __init__(self, repository: UserRepository) -> None:
        """リポジトリでサービスを初期化

        Args:
            repository: ユーザーリポジトリ
        """
        self._repository = repository

    async def is_email_available(
        self,
        email: Email,
        exclude_user_id: str | None = None,
    ) -> bool:
        """メールアドレスが利用可能かどうかを確認

        Args:
            email: 確認するメールアドレス
            exclude_user_id: 除外するユーザーID（更新時に自分自身を除外）

        Returns:
            利用可能であれば True
        """
        existing_user = await self._repository.find_by_email(email)

        if existing_user is None:
            return True

        # 更新時に自分自身を除外
        return bool(exclude_user_id and existing_user.id == exclude_user_id)

    async def create_user(
        self,
        email: Email,
        name: UserName,
        bio: str | None = None,
    ) -> User:
        """一意性チェック付きでユーザーを作成

        メールアドレスの一意性を確認してからユーザーを作成します。

        Args:
            email: メールアドレス
            name: ユーザー名
            bio: 自己紹介文（オプション）

        Returns:
            作成されたユーザー

        Raises:
            DuplicateEmailError: メールアドレスが既に存在する場合
        """
        # メールアドレスの一意性を確認
        if not await self.is_email_available(email):
            raise DuplicateEmailError(str(email))

        # ユーザーを作成
        user = User.create(
            email=email,
            name=name,
            bio=bio,
        )

        # 永続化
        return await self._repository.create(user)

    async def change_user_email(
        self,
        user: User,
        new_email: Email,
    ) -> None:
        """一意性チェック付きでメールアドレスを変更

        Args:
            user: ユーザー
            new_email: 新しいメールアドレス

        Raises:
            DuplicateEmailError: メールアドレスが既に使用されている場合
        """
        # 現在のメールアドレスと同じ場合は何もしない
        if str(user.email) == str(new_email):
            return

        # メールアドレスの一意性を確認
        if not await self.is_email_available(new_email, exclude_user_id=user.id):
            raise DuplicateEmailError(str(new_email))

        # メールアドレスを変更
        user.change_email(new_email)

        # 永続化
        await self._repository.update(user)

    async def deactivate_user(
        self,
        user_id: str,
        reason: str | None = None,
    ) -> User:
        """ユーザーを非アクティブ化

        Args:
            user_id: ユーザーID
            reason: 非アクティブ化の理由（オプション）

        Returns:
            非アクティブ化されたユーザー

        Raises:
            UserNotFoundError: ユーザーが見つからない場合
        """
        from .errors import UserNotFoundError

        user = await self._repository.find_by_id(user_id)
        if user is None:
            raise UserNotFoundError(user_id)

        user.deactivate(reason)
        await self._repository.update(user)

        return user

    async def get_active_user_count(self) -> int:
        """アクティブユーザー数を取得

        Returns:
            アクティブユーザーの数
        """
        users, _ = await self._repository.find_all(limit=10000, offset=0)
        return sum(1 for user in users if user.is_active())
