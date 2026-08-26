"""イベントディスパッチャー

ドメインイベントを適切なハンドラーにディスパッチする責務を持ちます。

使用例:
    # インプロセスディスパッチャーを作成
    dispatcher = InProcessEventDispatcher()

    # ハンドラーを登録
    dispatcher.register(SampleCreatedEvent, LoggingEventHandler())
    dispatcher.register(SampleCreatedEvent, NotificationEventHandler())

    # イベントをディスパッチ
    await dispatcher.dispatch(SampleCreatedEvent(sample_id="123", name="test"))

    # 複数のイベントを一括でディスパッチ
    events = entity.get_domain_events()
    await dispatcher.dispatch_all(events)
    entity.clear_domain_events()
"""

from collections import defaultdict
from typing import TypeVar

from src.shared.domain import DomainEvent
from src.shared.events import EventHandler, IEventDispatcher

from ..logger.logger import logger

T = TypeVar("T", bound=DomainEvent)


class InProcessEventDispatcher(IEventDispatcher):
    """インプロセスイベントディスパッチャー

    アプリケーション内でイベントを同期的にディスパッチします。
    現在のデフォルト実装です。

    ドメインイベントを登録されたハンドラーにディスパッチします。
    1つのイベントに対して複数のハンドラーを登録できます。

    特徴:
    - 非同期処理をサポート
    - 1つのイベントに複数のハンドラーを登録可能
    - ハンドラーの実行順序は登録順
    - エラーが発生しても他のハンドラーは継続実行

    Attributes:
        _handlers: イベントタイプとハンドラーのマッピング
        _global_handlers: すべてのイベントに対して実行されるハンドラー
    """

    def __init__(self) -> None:
        """ディスパッチャーを初期化"""
        self._handlers: dict[type[DomainEvent], list[EventHandler]] = defaultdict(list)
        self._global_handlers: list[EventHandler] = []

    def register(
        self,
        event_type: type[T],
        handler: EventHandler,
    ) -> None:
        """特定のイベントタイプにハンドラーを登録

        Args:
            event_type: イベントのクラス
            handler: イベントを処理するハンドラー

        Example:
            dispatcher.register(SampleCreatedEvent, LoggingEventHandler())
        """
        self._handlers[event_type].append(handler)
        logger.debug(
            f"ハンドラー {handler.__class__.__name__} を {event_type.__name__} に登録しました"
        )

    def register_global(self, handler: EventHandler) -> None:
        """すべてのイベントに対してハンドラーを登録

        Args:
            handler: すべてのイベントを処理するハンドラー

        Example:
            dispatcher.register_global(AuditLogHandler())
        """
        self._global_handlers.append(handler)
        logger.debug(f"グローバルハンドラー {handler.__class__.__name__} を登録しました")

    def unregister(
        self,
        event_type: type[T],
        handler: EventHandler,
    ) -> None:
        """ハンドラーの登録を解除

        Args:
            event_type: イベントのクラス
            handler: 解除するハンドラー
        """
        if event_type in self._handlers:
            try:
                self._handlers[event_type].remove(handler)
                logger.debug(
                    f"ハンドラー {handler.__class__.__name__} を "
                    f"{event_type.__name__} から解除しました"
                )
            except ValueError:
                pass  # ハンドラーが見つからない場合は無視

    async def dispatch(self, event: DomainEvent) -> None:
        """イベントをディスパッチ

        登録されたすべてのハンドラーにイベントを送信します。
        グローバルハンドラーが先に実行され、次に特定のハンドラーが実行されます。

        Args:
            event: ディスパッチするドメインイベント

        Note:
            ハンドラーでエラーが発生しても、他のハンドラーは継続して実行されます。
            エラーはログに記録されます。
        """
        event_type = type(event)
        logger.debug(f"イベント {event_type.__name__} をディスパッチします")

        # グローバルハンドラーを実行
        for handler in self._global_handlers:
            await self._execute_handler(handler, event)

        # 特定のイベントタイプのハンドラーを実行
        for handler in self._handlers[event_type]:
            await self._execute_handler(handler, event)

    async def dispatch_all(self, events: list[DomainEvent]) -> None:
        """複数のイベントを一括でディスパッチ

        Args:
            events: ディスパッチするドメインイベントのリスト

        Example:
            events = entity.get_domain_events()
            await dispatcher.dispatch_all(events)
            entity.clear_domain_events()
        """
        for event in events:
            await self.dispatch(event)

    async def _execute_handler(
        self,
        handler: EventHandler,
        event: DomainEvent,
    ) -> None:
        """ハンドラーを実行（エラーハンドリング付き）

        Args:
            handler: 実行するハンドラー
            event: 処理するイベント
        """
        try:
            await handler.handle(event)
        except Exception as e:
            # エラーをログに記録し、他のハンドラーの実行を継続
            logger.error(f"ハンドラー {handler.__class__.__name__} で エラーが発生しました: {e}")

    def get_handlers(self, event_type: type[T]) -> list[EventHandler]:
        """特定のイベントタイプに登録されたハンドラーを取得

        Args:
            event_type: イベントのクラス

        Returns:
            登録されたハンドラーのリスト
        """
        return list[EventHandler](self._handlers[event_type])

    def clear(self) -> None:
        """すべてのハンドラー登録をクリア"""
        self._handlers.clear()
        self._global_handlers.clear()
        logger.debug("すべてのハンドラー登録をクリアしました")
