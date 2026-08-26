"""イベントディスパッチャーのテスト"""

from dataclasses import dataclass

import pytest

from src.infrastructure.events import InProcessEventDispatcher
from src.shared.domain import DomainEvent
from src.shared.events import EventHandler


@dataclass
class MockDomainEvent(DomainEvent):
    """テスト用モックイベント"""

    message: str = ""


class MockHandler(EventHandler):
    """テスト用モックハンドラー"""

    def __init__(self) -> None:
        self.handled_events: list[DomainEvent] = []

    async def handle(self, event: DomainEvent) -> None:
        self.handled_events.append(event)


class FailingHandler(EventHandler):
    """失敗するテスト用ハンドラー"""

    async def handle(self, event: DomainEvent) -> None:  # noqa: ARG002
        raise RuntimeError("Handler failed")


class TestEventDispatcher:
    """InProcessEventDispatcher のテスト"""

    @pytest.mark.asyncio
    async def test_dispatch_single_event(self) -> None:
        """単一のイベントをディスパッチできる"""
        dispatcher = InProcessEventDispatcher()
        handler = MockHandler()
        dispatcher.register(MockDomainEvent, handler)

        event = MockDomainEvent(message="test")
        await dispatcher.dispatch(event)

        assert len(handler.handled_events) == 1
        assert handler.handled_events[0] == event

    @pytest.mark.asyncio
    async def test_dispatch_to_multiple_handlers(self) -> None:
        """複数のハンドラーにディスパッチできる"""
        dispatcher = InProcessEventDispatcher()
        handler1 = MockHandler()
        handler2 = MockHandler()
        dispatcher.register(MockDomainEvent, handler1)
        dispatcher.register(MockDomainEvent, handler2)

        event = MockDomainEvent(message="test")
        await dispatcher.dispatch(event)

        assert len(handler1.handled_events) == 1
        assert len(handler2.handled_events) == 1

    @pytest.mark.asyncio
    async def test_global_handler(self) -> None:
        """グローバルハンドラーがすべてのイベントを受け取る"""
        dispatcher = InProcessEventDispatcher()
        global_handler = MockHandler()
        dispatcher.register_global(global_handler)

        event = MockDomainEvent(message="test")
        await dispatcher.dispatch(event)

        assert len(global_handler.handled_events) == 1

    @pytest.mark.asyncio
    async def test_dispatch_all(self) -> None:
        """複数のイベントを一括でディスパッチできる"""
        dispatcher = InProcessEventDispatcher()
        handler = MockHandler()
        dispatcher.register(MockDomainEvent, handler)

        events: list[DomainEvent] = [MockDomainEvent(message="1"), MockDomainEvent(message="2")]
        await dispatcher.dispatch_all(events)

        assert len(handler.handled_events) == 2

    @pytest.mark.asyncio
    async def test_handler_error_does_not_stop_others(self) -> None:
        """ハンドラーのエラーは他のハンドラーの実行を妨げない"""
        dispatcher = InProcessEventDispatcher()
        failing_handler = FailingHandler()
        success_handler = MockHandler()
        dispatcher.register(MockDomainEvent, failing_handler)
        dispatcher.register(MockDomainEvent, success_handler)

        event = MockDomainEvent(message="test")
        await dispatcher.dispatch(event)

        # 失敗しても success_handler は実行される
        assert len(success_handler.handled_events) == 1

    @pytest.mark.asyncio
    async def test_unregister_handler(self) -> None:
        """ハンドラーの登録を解除できる"""
        dispatcher = InProcessEventDispatcher()
        handler = MockHandler()
        dispatcher.register(MockDomainEvent, handler)
        dispatcher.unregister(MockDomainEvent, handler)

        event = MockDomainEvent(message="test")
        await dispatcher.dispatch(event)

        assert len(handler.handled_events) == 0

    @pytest.mark.asyncio
    async def test_clear_handlers(self) -> None:
        """すべてのハンドラーをクリアできる"""
        dispatcher = InProcessEventDispatcher()
        handler = MockHandler()
        global_handler = MockHandler()
        dispatcher.register(MockDomainEvent, handler)
        dispatcher.register_global(global_handler)

        dispatcher.clear()

        event = MockDomainEvent(message="test")
        await dispatcher.dispatch(event)

        assert len(handler.handled_events) == 0
        assert len(global_handler.handled_events) == 0

    def test_get_handlers(self) -> None:
        """登録されたハンドラーを取得できる"""
        dispatcher = InProcessEventDispatcher()
        handler1 = MockHandler()
        handler2 = MockHandler()
        dispatcher.register(MockDomainEvent, handler1)
        dispatcher.register(MockDomainEvent, handler2)

        handlers = dispatcher.get_handlers(MockDomainEvent)
        assert len(handlers) == 2
        assert handler1 in handlers
        assert handler2 in handlers
