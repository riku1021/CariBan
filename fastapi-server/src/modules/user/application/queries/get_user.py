"""user モジュールのユーザー取得クエリ。"""

from src.modules.user.domain import UserNotFoundError, UserRepository

from ..dto import GetUserResponse, UserProfileResponse


class GetUserQuery:
    """ユーザー取得クエリ

    リポジトリを使用してIDでユーザーを取得します。

    例外:
        UserNotFoundError: ユーザーが見つからない場合
    """

    def __init__(self, repository: UserRepository) -> None:
        """クエリを初期化

        Args:
            repository: ユーザーリポジトリ
        """
        self._repository = repository

    async def execute(self, user_id: str) -> GetUserResponse:
        """ユーザー取得クエリを実行

        Args:
            user_id: 取得するユーザーID

        Returns:
            ユーザーレスポンス DTO

        Raises:
            UserNotFoundError: ユーザーが見つからない場合
        """
        user = await self._repository.find_by_id(user_id)

        if user is None:
            raise UserNotFoundError(user_id)

        # プロファイルをレスポンス DTO に変換
        profile_response = None
        if user.profile:
            profile_response = UserProfileResponse(
                bio=user.profile.bio,
                avatar_url=user.profile.avatar_url,
                website=user.profile.website,
                location=user.profile.location,
            )

        return GetUserResponse(
            id=user.id,
            email=str(user.email),
            first_name=user.name.first_name,
            last_name=user.name.last_name,
            full_name=str(user.name),
            status=user.status.value,
            profile=profile_response,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )
