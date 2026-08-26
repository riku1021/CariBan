# イベントソーシングガイド

このドキュメントでは、イベントソーシングパターンについて説明します。
これは上級者向けの高度なパターンです。

---

## イベントソーシングとは

イベントソーシングは、エンティティの状態を**イベントの履歴**として保存するパターンです。
現在の状態は、すべてのイベントを最初から**リプレイ**することで再構築されます。

### 従来の状態保存 vs イベントソーシング

**従来の状態保存:**

```
┌─────────────────────────────────────┐
│ users テーブル                       │
├─────────────────────────────────────┤
│ id: "user-123"                      │
│ email: "new@example.com"            │  ← 最新の状態のみ
│ name: "山田 太郎"                    │
│ is_active: true                     │
└─────────────────────────────────────┘
```

**イベントソーシング:**

```
┌─────────────────────────────────────────────────────┐
│ user_events テーブル                                 │
├─────────────────────────────────────────────────────┤
│ 1. UserCreatedEvent(email="old@example.com", ...)   │
│ 2. UserEmailChangedEvent(new_email="new@example.com")│
│ 3. UserProfileUpdatedEvent(bio="...")               │
│ ...                                                 │
└─────────────────────────────────────────────────────┘
        ↓ リプレイ
┌─────────────────────────────────────┐
│ 現在の状態（メモリ上）               │
│ email: "new@example.com"            │
│ name: "山田 太郎"                    │
│ is_active: true                     │
└─────────────────────────────────────┘
```

---

## メリットとデメリット

### メリット

1. **完全な監査ログ**: すべての変更履歴が保存される
2. **時系列での復元**: 任意の時点の状態を復元できる
3. **イベント駆動との親和性**: CQRS と組み合わせやすい
4. **デバッグのしやすさ**: 問題発生時にイベントを追跡できる
5. **ビジネスインサイト**: イベントからビジネス分析が可能

### デメリット

1. **複雑性**: 実装と運用が複雑
2. **ストレージ**: イベントが増えるとストレージが増大
3. **クエリの複雑さ**: 読み取りモデルが別途必要（CQRS）
4. **スキーマ進化**: イベントスキーマの変更が困難
5. **学習コスト**: チームの理解が必要

---

## 実装例

### イベントストア

```python
from src.infrastructure.events.event_store import (
    EventStore,
    InMemoryEventStore,
    StoredEvent,
)

# インメモリイベントストアを作成
store = InMemoryEventStore()

# イベントを追加
await store.append(
    aggregate_id="user-123",
    events=[UserCreatedEvent(...), UserEmailChangedEvent(...)],
    expected_version=0,  # 楽観的ロック
)

# イベントを取得
events = await store.get_events("user-123")
```

### イベントソーシング対応エンティティ

```python
class EventSourcedUser:
    """イベントソーシング対応ユーザーエンティティ"""

    def __init__(self) -> None:
        self.id: str = ""
        self.email: str = ""
        self.name: str = ""
        self.is_active: bool = True
        self._version: int = 0
        self._uncommitted_events: list[DomainEvent] = []

    @classmethod
    def from_events(cls, events: list[StoredEvent]) -> "EventSourcedUser":
        """イベントからエンティティを再構築"""
        user = cls()
        for stored_event in events:
            user._apply(stored_event.event)
            user._version = stored_event.version
        return user

    def _apply(self, event: DomainEvent) -> None:
        """イベントを適用して状態を更新"""
        if isinstance(event, UserCreatedEvent):
            self.id = event.user_id
            self.email = event.email
            self.name = event.full_name
        elif isinstance(event, UserEmailChangedEvent):
            self.email = event.new_email
        elif isinstance(event, UserDeactivatedEvent):
            self.is_active = False

    def change_email(self, new_email: str) -> None:
        """メールアドレスを変更（イベントを発行）"""
        event = UserEmailChangedEvent(
            user_id=self.id,
            old_email=self.email,
            new_email=new_email,
        )
        self._apply(event)  # 状態を更新
        self._uncommitted_events.append(event)  # イベントを記録

    def get_uncommitted_events(self) -> list[DomainEvent]:
        """未コミットのイベントを取得"""
        return list(self._uncommitted_events)

    def clear_uncommitted_events(self) -> None:
        """未コミットのイベントをクリア"""
        self._uncommitted_events.clear()
```

### リポジトリの実装

```python
class EventSourcedUserRepository:
    """イベントソーシング対応リポジトリ"""

    def __init__(self, event_store: EventStore) -> None:
        self._store = event_store

    async def save(self, user: EventSourcedUser) -> None:
        """ユーザーを保存（イベントを追加）"""
        events = user.get_uncommitted_events()
        if events:
            await self._store.append(
                aggregate_id=user.id,
                events=events,
                expected_version=user._version,
            )
            user.clear_uncommitted_events()

    async def find_by_id(self, user_id: str) -> EventSourcedUser | None:
        """ユーザーを取得（イベントから再構築）"""
        events = await self._store.get_events(user_id)
        if not events:
            return None
        return EventSourcedUser.from_events(events)
```

---

## CQRS との組み合わせ

イベントソーシングは通常、CQRS（Command Query Responsibility Segregation）と
組み合わせて使用されます。

```
┌─────────────────────────────────────────────────────────────┐
│                        Commands                             │
│                           │                                 │
│                           ▼                                 │
│                  ┌────────────────┐                         │
│                  │ Event Store    │ ← イベントを追加        │
│                  │ (Write Model)  │                         │
│                  └────────┬───────┘                         │
│                           │                                 │
│                           │ イベントを発行                  │
│                           ▼                                 │
│                  ┌────────────────┐                         │
│                  │ Event Handler  │                         │
│                  │ (Projection)   │                         │
│                  └────────┬───────┘                         │
│                           │                                 │
│                           │ 読み取りモデルを更新            │
│                           ▼                                 │
│                  ┌────────────────┐                         │
│                  │ Read Database  │ ← クエリ用              │
│                  │ (Read Model)   │                         │
│                  └────────────────┘                         │
│                           ▲                                 │
│                           │                                 │
│                        Queries                              │
└─────────────────────────────────────────────────────────────┘
```

### Projection（投影）

```python
class UserProjection:
    """ユーザー読み取りモデルの投影"""

    def __init__(self, read_db: ReadDatabase) -> None:
        self._db = read_db

    async def handle(self, event: DomainEvent) -> None:
        """イベントを処理して読み取りモデルを更新"""
        if isinstance(event, UserCreatedEvent):
            await self._db.insert(
                "users",
                {
                    "id": event.user_id,
                    "email": event.email,
                    "name": event.full_name,
                }
            )
        elif isinstance(event, UserEmailChangedEvent):
            await self._db.update(
                "users",
                {"email": event.new_email},
                where={"id": event.user_id}
            )
```

---

## スナップショット

イベントが多くなると、リプレイに時間がかかります。
スナップショットを使用して、パフォーマンスを改善できます。

```python
class SnapshotStore:
    """スナップショットストア"""

    async def save_snapshot(
        self,
        aggregate_id: str,
        state: dict,
        version: int,
    ) -> None:
        """スナップショットを保存"""
        pass

    async def get_snapshot(
        self,
        aggregate_id: str,
    ) -> tuple[dict, int] | None:
        """スナップショットを取得"""
        pass


class EventSourcedUserRepositoryWithSnapshot:
    """スナップショット対応リポジトリ"""

    SNAPSHOT_INTERVAL = 100  # 100 イベントごとにスナップショット

    async def find_by_id(self, user_id: str) -> EventSourcedUser | None:
        # スナップショットを取得
        snapshot = await self._snapshot_store.get_snapshot(user_id)

        if snapshot:
            state, version = snapshot
            user = EventSourcedUser.from_snapshot(state)
            # スナップショット以降のイベントのみ取得
            events = await self._event_store.get_events(
                user_id,
                from_version=version
            )
        else:
            user = EventSourcedUser()
            events = await self._event_store.get_events(user_id)

        # イベントをリプレイ
        for stored_event in events:
            user._apply(stored_event.event)
            user._version = stored_event.version

        return user
```

---

## 適用すべきケース

イベントソーシングは以下のケースで特に有効です：

1. **完全な監査ログが必要**: 金融、医療、法的要件
2. **時系列での復元が必要**: 状態のデバッグ、ロールバック
3. **複雑なドメインロジック**: 多くのビジネスルールとイベント
4. **イベント駆動アーキテクチャ**: マイクロサービス、非同期処理

### 避けるべきケース

1. **シンプルな CRUD アプリケーション**
2. **パフォーマンスが最優先**
3. **チームがパターンに不慣れ**
4. **短期プロジェクト**

---

## まとめ

イベントソーシングは強力なパターンですが、複雑性も伴います。
導入前に、以下を検討してください：

1. **本当に必要か**: 監査ログだけなら別の方法もある
2. **チームの準備**: 学習コストを考慮
3. **インフラの準備**: イベントストア、CQRS 基盤
4. **段階的導入**: 一部のドメインから始める

このテンプレートでは、学習目的でインメモリイベントストアを提供しています。
本番環境では、EventStoreDB や Kafka などの専用ソリューションを検討してください。
