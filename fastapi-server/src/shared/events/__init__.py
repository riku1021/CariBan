"""イベント関連の共有インターフェース。

ドメインイベントを扱うための抽象インターフェース（EventHandler, IEventDispatcher）を
インフラ層から切り離し、Functional Core から参照できるようにします。
"""

from abc import ABC, abstractmethod
from typing import TypeVar

from src.shared.domain import DomainEvent

TDomainEvent = TypeVar("TDomainEvent", bound=DomainEvent)


class EventHandler(ABC):
    """イベントハンドラーの基底クラス。

    すべてのイベントハンドラーはこのクラスを継承することを前提とします。
    """

    @abstractmethod
    async def handle(self, event: DomainEvent) -> None:
        """イベントを処理する。"""
        raise NotImplementedError


class IEventDispatcher(ABC):
    """イベントディスパッチャーの抽象インターフェース。

    すべてのイベントディスパッチャー実装はこのインターフェースを実装します。
    """

    @abstractmethod
    async def dispatch(self, event: DomainEvent) -> None:
        """単一イベントをディスパッチする。"""
        raise NotImplementedError

    @abstractmethod
    async def dispatch_all(self, events: list[DomainEvent]) -> None:
        """複数イベントを一括でディスパッチする。"""
        raise NotImplementedError


__all__ = ["EventHandler", "IEventDispatcher"]
