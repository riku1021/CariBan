"""ユーザーリポジトリ実装 - インメモリ

テスト・開発用のインメモリリポジトリ実装です。
本番環境では、データベースを使用した実装に置き換えてください。

注意:
- このリポジトリは User（Aggregate Root）全体を保存します
- UserProfile は User と一緒に保存されます
- 集約の整合性が保証されます
"""

from uuid import uuid4

from src.modules.user.domain import (
    DuplicateEmailError,
    Email,
    User,
    UserName,
    UserNotFoundError,
    UserProfile,
    UserRepository,
)


class InMemoryUserRepository(UserRepository):
    """インメモリユーザーリポジトリ

    テスト・開発用のインメモリ実装です。
    データはメモリに保持され、アプリケーション終了時に失われます。

    本番環境では、以下のような実装に置き換えてください:
    - PostgreSQL を使用した実装
    - MongoDB を使用した実装
    - その他のデータベースを使用した実装
    """

    def __init__(self) -> None:
        """リポジトリを初期化"""
        self._users: dict[str, User] = {}
        self._email_index: dict[str, str] = {}  # email -> user_id

    async def create(self, user: User) -> User:
        """新しいユーザーを作成

        Args:
            user: 作成するユーザー

        Returns:
            IDが割り当てられた作成済みユーザー

        Raises:
            DuplicateEmailError: メールアドレスが既に存在する場合
        """
        # メールアドレスの重複チェック
        email_str = str(user.email)
        if email_str in self._email_index:
            raise DuplicateEmailError(email_str)

        # IDを生成
        user_id = str(uuid4())
        user.set_id(user_id)

        # ストレージに保存（ディープコピー）
        stored_user = self._copy_user(user)
        self._users[user_id] = stored_user
        self._email_index[email_str] = user_id

        return user

    async def find_by_id(self, id: str) -> User | None:
        """IDでユーザーを検索

        Args:
            id: ユーザーID

        Returns:
            見つかった場合はユーザー、そうでなければ None
        """
        stored = self._users.get(id)
        if stored is None:
            return None
        return self._copy_user(stored)

    async def find_by_email(self, email: Email) -> User | None:
        """メールアドレスでユーザーを検索

        Args:
            email: メールアドレス

        Returns:
            見つかった場合はユーザー、そうでなければ None
        """
        user_id = self._email_index.get(str(email))
        if user_id is None:
            return None
        return await self.find_by_id(user_id)

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
        """
        all_users = list(self._users.values())
        total = len(all_users)

        # ページネーション
        start = offset
        end = offset + limit
        paginated = all_users[start:end]

        # コピーを返す
        return [self._copy_user(u) for u in paginated], total

    async def update(self, user: User) -> None:
        """既存のユーザーを更新

        Args:
            user: 更新するユーザー

        Raises:
            UserNotFoundError: ユーザーが見つからない場合
        """
        if user.id not in self._users:
            raise UserNotFoundError(user.id)

        # 古いメールアドレスを削除
        old_user = self._users[user.id]
        old_email = str(old_user.email)
        if old_email in self._email_index:
            del self._email_index[old_email]

        # 新しいメールアドレスを登録
        new_email = str(user.email)
        self._email_index[new_email] = user.id

        # ストレージを更新
        self._users[user.id] = self._copy_user(user)

    async def delete(self, id: str) -> None:
        """ユーザーを削除

        Args:
            id: 削除するユーザーのID

        Raises:
            UserNotFoundError: ユーザーが見つからない場合
        """
        if id not in self._users:
            raise UserNotFoundError(id)

        user = self._users[id]
        email = str(user.email)

        # インデックスから削除
        if email in self._email_index:
            del self._email_index[email]

        # ストレージから削除
        del self._users[id]

    async def exists_by_email(self, email: Email) -> bool:
        """メールアドレスが存在するかどうかを確認

        Args:
            email: 確認するメールアドレス

        Returns:
            存在すれば True
        """
        return str(email) in self._email_index

    def _copy_user(self, user: User) -> User:
        """ユーザーのディープコピーを作成

        メモリ内のデータを直接変更されないようにするため、
        常にコピーを返します。

        Args:
            user: コピー元のユーザー

        Returns:
            ユーザーのコピー
        """
        # プロファイルのコピー
        profile_copy = None
        if user.profile:
            profile_copy = UserProfile(
                bio=user.profile.bio,
                avatar_url=user.profile.avatar_url,
                website=user.profile.website,
                location=user.profile.location,
                created_at=user.profile.created_at,
                updated_at=user.profile.updated_at,
            )

        # ユーザーの再構築
        return User.reconstruct(
            id=user.id,
            email=Email(str(user.email)),
            name=UserName(
                first_name=user.name.first_name,
                last_name=user.name.last_name,
            ),
            status=user.status,
            profile=profile_copy,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )

    # =========================================================================
    # テスト用ヘルパーメソッド
    # =========================================================================

    def clear(self) -> None:
        """すべてのデータをクリア（テスト用）"""
        self._users.clear()
        self._email_index.clear()

    def count(self) -> int:
        """ユーザー数を取得（テスト用）"""
        return len(self._users)
