"""ドメインイベント基底クラス（共有版）

ドメインイベントは、ドメイン内で発生した重要な出来事を表現します。
コンポーネント間の疎結合を実現し、拡張性を向上させます。

使用例:
    class UserCreatedEvent(DomainEvent):
        def __init__(self, user_id: str, email: str) -> None:
            super().__init__()
            self.user_id = user_id
            self.email = email

    # エンティティ内でイベントを発行
    entity.add_domain_event(UserCreatedEvent(user_id="123", email="test@example.com"))

    # ユースケースでイベントを処理
    events = entity.get_domain_events()
    entity.clear_domain_events()
    for event in events:
        await event_dispatcher.dispatch(event)
"""

from dataclasses import dataclass, field
from datetime import datetime
from uuid import uuid4


@dataclass
class DomainEvent:
    """ドメインイベントの基底クラス

    すべてのドメインイベントはこのクラスを継承する必要があります。

    Attributes:
        event_id: イベントの一意識別子
        occurred_at: イベントが発生した日時
        event_type: イベントの種類（クラス名）
    """

    event_id: str = field(default_factory=lambda: str(uuid4()))
    occurred_at: datetime = field(default_factory=datetime.now)

    @property
    def event_type(self) -> str:
        """イベントの種類を返す"""
        return self.__class__.__name__

    def __repr__(self) -> str:
        return f"{self.event_type}(event_id={self.event_id}, occurred_at={self.occurred_at})"


__all__ = ["DomainEvent"]
