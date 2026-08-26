"""イベントインフラストラクチャ

ドメインイベントを処理するためのインフラストラクチャを提供します。

主なコンポーネント:
- InProcessEventDispatcher: インプロセス実装（デフォルト）
- EventStore: イベントソーシング用のイベントストア（上級者向け）
"""

from .dispatcher import InProcessEventDispatcher
from .event_store import (
    ConcurrencyError,
    EventStore,
    InMemoryEventStore,
    StoredEvent,
)

__all__ = [
    "InProcessEventDispatcher",
    "EventStore",
    "InMemoryEventStore",
    "StoredEvent",
    "ConcurrencyError",
]
