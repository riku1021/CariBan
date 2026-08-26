"""イベントストア - イベントソーシング用

イベントソーシングは、エンティティの状態をイベントの履歴として保存するパターンです。
現在の状態は、すべてのイベントをリプレイすることで再構築されます。

特徴:
- 完全な監査ログ
- 状態の時系列での復元が可能
- イベント駆動アーキテクチャとの親和性

注意:
- これは上級者向けの高度なパターンです
- すべてのユースケースに適しているわけではありません
- 学習目的の実装例として提供しています

使用例:
    store = InMemoryEventStore()

    # イベントを保存
    await store.append(aggregate_id, events)

    # イベントを取得してエンティティを再構築
    events = await store.get_events(aggregate_id)
    entity = Entity.from_events(events)
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime

from ...shared.domain import DomainEvent
from ..logger.logger import logger


@dataclass
class StoredEvent:
    """保存されたイベント

    イベントストアに保存されるイベントのラッパー。
    メタデータを含みます。

    Attributes:
        aggregate_id: 集約ID
        event: ドメインイベント
        version: イベントのバージョン番号
        stored_at: 保存日時
    """

    aggregate_id: str
    event: DomainEvent
    version: int
    stored_at: datetime = field(default_factory=datetime.now)


class EventStore(ABC):
    """イベントストアの抽象基底クラス

    イベントソーシング用のイベントストアインターフェース。
    """

    @abstractmethod
    async def append(
        self,
        aggregate_id: str,
        events: list[DomainEvent],
        expected_version: int | None = None,
    ) -> None:
        """イベントを追加

        Args:
            aggregate_id: 集約ID
            events: 追加するイベントのリスト
            expected_version: 期待するバージョン（楽観的ロック用）

        Raises:
            ConcurrencyError: バージョンの競合が発生した場合
        """
        pass

    @abstractmethod
    async def get_events(
        self,
        aggregate_id: str,
        from_version: int = 0,
    ) -> list[StoredEvent]:
        """イベントを取得

        Args:
            aggregate_id: 集約ID
            from_version: 取得開始バージョン

        Returns:
            保存されたイベントのリスト
        """
        pass

    @abstractmethod
    async def get_latest_version(self, aggregate_id: str) -> int:
        """最新バージョンを取得

        Args:
            aggregate_id: 集約ID

        Returns:
            最新バージョン（イベントがない場合は 0）
        """
        pass


class ConcurrencyError(Exception):
    """並行性エラー

    楽観的ロックでバージョンの競合が発生した場合に発生します。
    """

    def __init__(self, aggregate_id: str, expected: int, actual: int) -> None:
        self.aggregate_id = aggregate_id
        self.expected = expected
        self.actual = actual
        super().__init__(
            f"Concurrency conflict for aggregate {aggregate_id}: "
            f"expected version {expected}, but was {actual}"
        )


class InMemoryEventStore(EventStore):
    """インメモリイベントストア

    テスト・開発用のインメモリ実装。
    本番環境では、PostgreSQL や EventStoreDB などを使用してください。
    """

    def __init__(self) -> None:
        self._events: dict[str, list[StoredEvent]] = {}

    async def append(
        self,
        aggregate_id: str,
        events: list[DomainEvent],
        expected_version: int | None = None,
    ) -> None:
        """イベントを追加

        Args:
            aggregate_id: 集約ID
            events: 追加するイベントのリスト
            expected_version: 期待するバージョン

        Raises:
            ConcurrencyError: バージョンの競合が発生した場合
        """
        if aggregate_id not in self._events:
            self._events[aggregate_id] = []

        current_version = len(self._events[aggregate_id])

        # 楽観的ロックのチェック
        if expected_version is not None and current_version != expected_version:
            raise ConcurrencyError(aggregate_id, expected_version, current_version)

        # イベントを追加
        for event in events:
            current_version += 1
            stored_event = StoredEvent(
                aggregate_id=aggregate_id,
                event=event,
                version=current_version,
            )
            self._events[aggregate_id].append(stored_event)

        logger.debug(
            f"Appended {len(events)} events to aggregate {aggregate_id}, "
            f"new version: {current_version}"
        )

    async def get_events(
        self,
        aggregate_id: str,
        from_version: int = 0,
    ) -> list[StoredEvent]:
        """イベントを取得

        Args:
            aggregate_id: 集約ID
            from_version: 取得開始バージョン

        Returns:
            保存されたイベントのリスト
        """
        if aggregate_id not in self._events:
            return []

        return [e for e in self._events[aggregate_id] if e.version > from_version]

    async def get_latest_version(self, aggregate_id: str) -> int:
        """最新バージョンを取得

        Args:
            aggregate_id: 集約ID

        Returns:
            最新バージョン
        """
        if aggregate_id not in self._events:
            return 0
        return len(self._events[aggregate_id])

    def clear(self) -> None:
        """すべてのイベントをクリア（テスト用）"""
        self._events.clear()


# =============================================================================
# イベントソーシング対応エンティティの例
# =============================================================================
#
# class EventSourcedUser:
#     """イベントソーシング対応ユーザーエンティティ
#
#     状態はイベントの履歴から再構築されます。
#     """
#
#     def __init__(self) -> None:
#         self.id: str = ""
#         self.email: str = ""
#         self.name: str = ""
#         self.is_active: bool = True
#         self._version: int = 0
#         self._uncommitted_events: list[DomainEvent] = []
#
#     @classmethod
#     def from_events(cls, events: list[StoredEvent]) -> "EventSourcedUser":
#         """イベントからエンティティを再構築"""
#         user = cls()
#         for stored_event in events:
#             user._apply(stored_event.event)
#             user._version = stored_event.version
#         return user
#
#     def _apply(self, event: DomainEvent) -> None:
#         """イベントを適用して状態を更新"""
#         if isinstance(event, UserCreatedEvent):
#             self.id = event.user_id
#             self.email = event.email
#             self.name = event.full_name
#         elif isinstance(event, UserEmailChangedEvent):
#             self.email = event.new_email
#         elif isinstance(event, UserDeactivatedEvent):
#             self.is_active = False
#
#     def change_email(self, new_email: str) -> None:
#         """メールアドレスを変更"""
#         event = UserEmailChangedEvent(
#             user_id=self.id,
#             old_email=self.email,
#             new_email=new_email,
#         )
#         self._apply(event)
#         self._uncommitted_events.append(event)
#
#     def get_uncommitted_events(self) -> list[DomainEvent]:
#         """未コミットのイベントを取得"""
#         return list(self._uncommitted_events)
#
#     def clear_uncommitted_events(self) -> None:
#         """未コミットのイベントをクリア"""
#         self._uncommitted_events.clear()
#
#
# # 使用例
# async def example_usage(store: EventStore) -> None:
#     # ユーザーを作成
#     user = EventSourcedUser()
#     user.id = "user-123"
#     # ... イベントを発行
#
#     # イベントを保存
#     events = user.get_uncommitted_events()
#     await store.append(user.id, events, expected_version=user._version)
#     user.clear_uncommitted_events()
#
#     # ユーザーを復元
#     stored_events = await store.get_events("user-123")
#     restored_user = EventSourcedUser.from_events(stored_events)
# =============================================================================
