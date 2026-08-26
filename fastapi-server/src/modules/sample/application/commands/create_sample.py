"""sample モジュールのサンプル作成コマンド。"""

from src.modules.sample.domain import SampleEntity, SampleRepository, SampleValueObject
from src.shared.events import IEventDispatcher

from ..dto import CreateSampleRequest, CreateSampleResponse


class CreateSampleCommand:
    """サンプル作成コマンド

    新しいサンプルエンティティを作成し、リポジトリを使用して永続化します。
    オプションでイベントディスパッチャーを使用してドメインイベントを処理します。

    例外:
        SampleValidationError: バリデーションに失敗した場合
        RepositoryOperationError: 永続化に失敗した場合
        DuplicateEntityError: 重複エンティティが存在する場合
    """

    def __init__(
        self,
        repository: SampleRepository,
        event_dispatcher: IEventDispatcher | None = None,
    ) -> None:
        """リポジトリとイベントディスパッチャーでコマンドを初期化

        Args:
            repository: 永続化用のサンプルリポジトリ
            event_dispatcher: ドメインイベントをディスパッチするディスパッチャー（オプション）
        """
        self._repository = repository
        self._event_dispatcher = event_dispatcher

    async def execute(self, request: CreateSampleRequest) -> CreateSampleResponse:
        """サンプル作成コマンドを実行

        Args:
            request: 作成リクエスト DTO

        Returns:
            作成レスポンス DTO

        Raises:
            SampleValidationError: バリデーションに失敗した場合
            RepositoryOperationError: 永続化に失敗した場合
            DuplicateEntityError: 重複エンティティが存在する場合
        """
        # リクエストデータから値オブジェクトを作成
        name = SampleValueObject(request.name)

        # エンティティを作成（ファクトリメソッドを使用）
        entity = SampleEntity.create(
            name=name,
            description=request.description,
        )

        # リポジトリを使用して永続化
        created_entity = await self._repository.create(entity)

        # ドメインイベントをディスパッチ
        if self._event_dispatcher:
            events = created_entity.get_domain_events()
            await self._event_dispatcher.dispatch_all(events)
            created_entity.clear_domain_events()

        return CreateSampleResponse(
            id=created_entity.id,
            name=str(created_entity.name),
            created_at=created_entity.created_at,
        )
