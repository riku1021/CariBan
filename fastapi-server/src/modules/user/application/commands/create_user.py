"""user モジュールのユーザー作成コマンド。"""

from src.modules.user.domain import Email, UserDomainService, UserName
from src.shared.events import IEventDispatcher

from ..dto import CreateUserRequest, CreateUserResponse


class CreateUserCommand:
    """ユーザー作成コマンド

    ドメインサービスを使用してユーザーを作成します。
    メールアドレスの一意性チェックが自動的に行われます。

    例外:
        UserValidationError: バリデーションに失敗した場合
        DuplicateEmailError: メールアドレスが既に存在する場合
    """

    def __init__(
        self,
        domain_service: UserDomainService,
        event_dispatcher: IEventDispatcher | None = None,
    ) -> None:
        """コマンドを初期化

        Args:
            domain_service: ユーザードメインサービス
            event_dispatcher: イベントディスパッチャー（オプション）
        """
        self._domain_service = domain_service
        self._event_dispatcher = event_dispatcher

    async def execute(self, request: CreateUserRequest) -> CreateUserResponse:
        """ユーザー作成コマンドを実行

        Args:
            request: 作成リクエスト DTO

        Returns:
            作成レスポンス DTO

        Raises:
            UserValidationError: バリデーションに失敗した場合
            DuplicateEmailError: メールアドレスが既に存在する場合
        """
        # 値オブジェクトを作成（バリデーションが行われる）
        email = Email(request.email)
        name = UserName(
            first_name=request.first_name,
            last_name=request.last_name,
        )

        # ドメインサービスを使用してユーザーを作成
        user = await self._domain_service.create_user(
            email=email,
            name=name,
            bio=request.bio,
        )

        # ドメインイベントをディスパッチ
        if self._event_dispatcher:
            events = user.get_domain_events()
            await self._event_dispatcher.dispatch_all(events)
            user.clear_domain_events()

        return CreateUserResponse(
            id=user.id,
            email=str(user.email),
            full_name=str(user.name),
            created_at=user.created_at,
        )
