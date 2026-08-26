"""user モジュールのユーザープロファイル更新コマンド。"""

from src.modules.user.domain import UserNotFoundError, UserRepository
from src.shared.events import IEventDispatcher

from ..dto import UpdateUserProfileRequest, UpdateUserProfileResponse


class UpdateUserProfileCommand:
    """ユーザープロファイル更新コマンド

    User（Aggregate Root）を通じてプロファイルを更新します。
    これにより、集約の整合性ルールが自動的に適用されます。

    例外:
        UserNotFoundError: ユーザーが見つからない場合
        UserProfileNotFoundError: プロファイルが見つからない場合
        UserValidationError: バリデーションに失敗した場合
    """

    def __init__(
        self,
        repository: UserRepository,
        event_dispatcher: IEventDispatcher | None = None,
    ) -> None:
        """コマンドを初期化

        Args:
            repository: ユーザーリポジトリ
            event_dispatcher: イベントディスパッチャー（オプション）
        """
        self._repository = repository
        self._event_dispatcher = event_dispatcher

    async def execute(
        self,
        request: UpdateUserProfileRequest,
    ) -> UpdateUserProfileResponse:
        """ユーザープロファイル更新コマンドを実行

        Args:
            request: 更新リクエスト DTO

        Returns:
            更新レスポンス DTO

        Raises:
            UserNotFoundError: ユーザーが見つからない場合
            UserProfileNotFoundError: プロファイルが見つからない場合
            UserValidationError: バリデーションに失敗した場合
        """
        # ユーザーを取得
        user = await self._repository.find_by_id(request.user_id)
        if user is None:
            raise UserNotFoundError(request.user_id)

        # Aggregate Root を通じてプロファイルを更新
        # これにより、集約の整合性ルールが自動的に適用される
        user.update_profile(
            bio=request.bio,
            avatar_url=request.avatar_url,
            website=request.website,
            location=request.location,
        )

        # 永続化
        await self._repository.update(user)

        # ドメインイベントをディスパッチ
        if self._event_dispatcher:
            events = user.get_domain_events()
            await self._event_dispatcher.dispatch_all(events)
            user.clear_domain_events()

        return UpdateUserProfileResponse(
            user_id=user.id,
            updated_at=user.updated_at,
        )
