"""イベントストアのテスト"""

from dataclasses import dataclass

import pytest

from src.infrastructure.events import ConcurrencyError, InMemoryEventStore
from src.shared.domain import DomainEvent


@dataclass
class SampleStoredEvent(DomainEvent):
    """テスト用イベント"""

    message: str = ""


class TestInMemoryEventStore:
    """InMemoryEventStore のテスト"""

    @pytest.mark.asyncio
    async def test_append_events(self) -> None:
        """イベントを追加できる"""
        store = InMemoryEventStore()
        events: list[DomainEvent] = [
            SampleStoredEvent(message="event1"),
            SampleStoredEvent(message="event2"),
        ]

        await store.append("aggregate-1", events)

        stored = await store.get_events("aggregate-1")
        assert len(stored) == 2
        assert isinstance(stored[0].event, SampleStoredEvent)
        assert isinstance(stored[1].event, SampleStoredEvent)
        assert stored[0].event.message == "event1"
        assert stored[1].event.message == "event2"

    @pytest.mark.asyncio
    async def test_event_versions(self) -> None:
        """イベントにバージョン番号が付与される"""
        store = InMemoryEventStore()
        events: list[DomainEvent] = [
            SampleStoredEvent(message="event1"),
            SampleStoredEvent(message="event2"),
        ]

        await store.append("aggregate-1", events)

        stored = await store.get_events("aggregate-1")
        assert stored[0].version == 1
        assert stored[1].version == 2

    @pytest.mark.asyncio
    async def test_get_latest_version(self) -> None:
        """最新バージョンを取得できる"""
        store = InMemoryEventStore()
        events: list[DomainEvent] = [
            SampleStoredEvent(message="event1"),
            SampleStoredEvent(message="event2"),
        ]

        await store.append("aggregate-1", events)
        version = await store.get_latest_version("aggregate-1")

        assert version == 2

    @pytest.mark.asyncio
    async def test_get_latest_version_empty(self) -> None:
        """イベントがない場合は 0 を返す"""
        store = InMemoryEventStore()
        version = await store.get_latest_version("nonexistent")
        assert version == 0

    @pytest.mark.asyncio
    async def test_get_events_from_version(self) -> None:
        """特定のバージョン以降のイベントを取得できる"""
        store = InMemoryEventStore()
        events1: list[DomainEvent] = [
            SampleStoredEvent(message="event1"),
            SampleStoredEvent(message="event2"),
        ]
        events2: list[DomainEvent] = [SampleStoredEvent(message="event3")]

        await store.append("aggregate-1", events1)
        await store.append("aggregate-1", events2)

        # バージョン 2 以降を取得
        stored = await store.get_events("aggregate-1", from_version=2)
        assert len(stored) == 1
        assert isinstance(stored[0].event, SampleStoredEvent)
        assert stored[0].event.message == "event3"

    @pytest.mark.asyncio
    async def test_optimistic_concurrency_success(self) -> None:
        """楽観的ロックが成功する場合"""
        store = InMemoryEventStore()
        events1: list[DomainEvent] = [SampleStoredEvent(message="event1")]
        await store.append("aggregate-1", events1, expected_version=0)

        events2: list[DomainEvent] = [SampleStoredEvent(message="event2")]
        await store.append("aggregate-1", events2, expected_version=1)

        stored = await store.get_events("aggregate-1")
        assert len(stored) == 2

    @pytest.mark.asyncio
    async def test_optimistic_concurrency_failure(self) -> None:
        """楽観的ロックが失敗する場合"""
        store = InMemoryEventStore()
        events1: list[DomainEvent] = [SampleStoredEvent(message="event1")]
        await store.append("aggregate-1", events1)

        events2: list[DomainEvent] = [SampleStoredEvent(message="event2")]
        with pytest.raises(ConcurrencyError):
            await store.append("aggregate-1", events2, expected_version=0)

    @pytest.mark.asyncio
    async def test_get_events_nonexistent_aggregate(self) -> None:
        """存在しない集約のイベントを取得すると空リストを返す"""
        store = InMemoryEventStore()
        events = await store.get_events("nonexistent")
        assert events == []

    @pytest.mark.asyncio
    async def test_clear(self) -> None:
        """すべてのイベントをクリアできる"""
        store = InMemoryEventStore()
        events: list[DomainEvent] = [SampleStoredEvent(message="event1")]
        await store.append("aggregate-1", events)

        store.clear()

        stored = await store.get_events("aggregate-1")
        assert len(stored) == 0

    @pytest.mark.asyncio
    async def test_multiple_aggregates(self) -> None:
        """複数の集約のイベントを独立して保存できる"""
        store = InMemoryEventStore()
        await store.append(
            "aggregate-1",
            [SampleStoredEvent(message="a1-event")],
        )
        await store.append(
            "aggregate-2",
            [SampleStoredEvent(message="a2-event")],
        )

        stored1 = await store.get_events("aggregate-1")
        stored2 = await store.get_events("aggregate-2")

        assert len(stored1) == 1
        assert isinstance(stored1[0].event, SampleStoredEvent)
        assert stored1[0].event.message == "a1-event"
        assert len(stored2) == 1
        assert isinstance(stored2[0].event, SampleStoredEvent)
        assert stored2[0].event.message == "a2-event"
