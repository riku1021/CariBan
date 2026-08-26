# DDD アンチパターンガイド

このドキュメントでは、Domain-Driven Design (DDD) を実装する際に避けるべきアンチパターンを説明します。

---

## 1. Anemic Domain Model（貧血症ドメインモデル）

### 説明

Anemic Domain Model は、エンティティがビジネスロジックを持たず、単なるデータコンテナとして機能するパターンです。ビジネスロジックはサービス層に集中し、手続き型のコードになります。

### 悪い例

```python
# ❌ 悪い例: エンティティがデータのみを持つ
@dataclass
class User:
    id: str
    email: str
    name: str
    status: str
    created_at: datetime

# ❌ ビジネスロジックがサービスに集中
class UserService:
    async def deactivate_user(self, user: User) -> None:
        # ビジネスロジックがエンティティの外にある
        if user.status == "inactive":
            raise ValueError("既に非アクティブです")
        user.status = "inactive"

    async def update_email(self, user: User, new_email: str) -> None:
        # バリデーションもサービスにある
        if not self._is_valid_email(new_email):
            raise ValueError("無効なメールアドレス")
        user.email = new_email.lower()
```

### 良い例

```python
# ✅ 良い例: エンティティにビジネスロジックを含む
@dataclass
class User(AggregateRoot):
    email: Email
    name: UserName
    status: UserStatus

    def deactivate(self, reason: str | None = None) -> None:
        """ユーザーを非アクティブ化

        ビジネスロジックがエンティティ内にある
        """
        if self.status == UserStatus.INACTIVE:
            raise UserValidationError("既に非アクティブです")

        self.status = UserStatus.INACTIVE
        self.touch()

        # ドメインイベントを発行
        self.add_domain_event(UserDeactivatedEvent(
            user_id=self.id,
            reason=reason,
        ))

    def change_email(self, new_email: Email) -> None:
        """メールアドレスを変更

        バリデーションは値オブジェクト（Email）で行われる
        """
        self._ensure_active()
        old_email = str(self.email)
        self.email = new_email
        self.touch()

        self.add_domain_event(UserEmailChangedEvent(
            user_id=self.id,
            old_email=old_email,
            new_email=str(new_email),
        ))
```

### 回避方法

1. **エンティティにビジネスロジックを配置**: 状態変更のロジックはエンティティ内に
2. **値オブジェクトでバリデーション**: 値のバリデーションは値オブジェクトで行う
3. **ドメインサービスは複数エンティティ間のロジックのみ**: 単一エンティティのロジックはエンティティ内に

---

## 2. ドメインサービスの過度な使用

### 説明

ドメインサービスを多用しすぎると、Anemic Domain Model と同様の問題が発生します。ドメインサービスは、複数のエンティティにまたがるロジックや、外部リソースを必要とするロジックにのみ使用すべきです。

### 悪い例

```python
# ❌ 悪い例: 単一エンティティのロジックをドメインサービスに配置
class UserDomainService:
    async def update_user_name(self, user: User, new_name: str) -> None:
        # これはエンティティのメソッドであるべき
        user.name = new_name
        user.updated_at = datetime.now()

    async def validate_user_email(self, email: str) -> bool:
        # これは値オブジェクトのバリデーションであるべき
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))
```

### 良い例

```python
# ✅ 良い例: ドメインサービスは複数エンティティ間のロジックのみ
class UserDomainService:
    def __init__(self, repository: UserRepository) -> None:
        self._repository = repository

    async def is_email_available(
        self,
        email: Email,
        exclude_user_id: str | None = None,
    ) -> bool:
        """メールアドレスの一意性を確認

        リポジトリへのアクセスが必要な操作
        """
        existing_user = await self._repository.find_by_email(email)
        if existing_user is None:
            return True
        if exclude_user_id and existing_user.id == exclude_user_id:
            return True
        return False

    async def transfer_ownership(
        self,
        from_user: User,
        to_user: User,
        items: list[Item],
    ) -> None:
        """所有権を移転

        複数エンティティにまたがる操作
        """
        for item in items:
            item.transfer_to(to_user.id)
```

### 判断基準

ドメインサービスを使用するかどうかの判断基準：

| 状況                               | 配置場所               |
| ---------------------------------- | ---------------------- |
| 単一エンティティの状態変更         | エンティティ           |
| 値のバリデーション                 | 値オブジェクト         |
| 複数エンティティにまたがる操作     | ドメインサービス       |
| 外部リソース（リポジトリなど）必要 | ドメインサービス       |
| トランザクション管理               | ユースケース（応用層） |

---

## 3. 過度に大きな集約

### 説明

集約が大きすぎると、パフォーマンス問題や競合問題が発生します。

### 悪い例

```python
# ❌ 悪い例: 大きすぎる集約
@dataclass
class Order(AggregateRoot):
    customer: Customer          # 別の集約であるべき
    items: list[OrderItem]
    payments: list[Payment]     # 別の集約であるべき
    shipments: list[Shipment]   # 別の集約であるべき
    reviews: list[Review]       # 別の集約であるべき
```

### 良い例

```python
# ✅ 良い例: 適切なサイズの集約
@dataclass
class Order(AggregateRoot):
    customer_id: str            # ID 参照のみ
    items: list[OrderItem]      # 集約内エンティティ

    def add_item(self, product_id: str, quantity: int) -> None:
        """注文に商品を追加

        集約内の整合性を保証
        """
        if any(item.product_id == product_id for item in self.items):
            raise OrderValidationError("同じ商品は既に追加されています")

        item = OrderItem(product_id=product_id, quantity=quantity)
        self.items.append(item)
        self.touch()

# Payment は別の集約
@dataclass
class Payment(AggregateRoot):
    order_id: str   # Order への ID 参照
    amount: Money
    status: PaymentStatus
```

### 設計ガイドライン

1. **集約は小さく保つ**: 必要最小限のエンティティのみ含む
2. **外部集約は ID で参照**: 直接のオブジェクト参照を避ける
3. **トランザクション境界を意識**: 1 トランザクションで 1 集約
4. **結果整合性を活用**: 集約間はドメインイベントで連携

---

## 4. リポジトリの過度な複雑化

### 説明

リポジトリに複雑なクエリロジックを詰め込むと、保守性が低下します。

### 悪い例

```python
# ❌ 悪い例: 複雑すぎるリポジトリ
class UserRepository(ABC):
    @abstractmethod
    async def find_active_users_with_profile_and_orders_in_last_30_days(
        self,
        min_order_count: int,
        product_category: str,
    ) -> list[User]:
        pass

    @abstractmethod
    async def find_users_by_complex_filter(
        self,
        filters: dict,
        sort_by: str,
        sort_order: str,
        include_relations: list[str],
    ) -> list[User]:
        pass
```

### 良い例

```python
# ✅ 良い例: シンプルなリポジトリ
class UserRepository(ABC):
    @abstractmethod
    async def find_by_id(self, id: str) -> User | None:
        pass

    @abstractmethod
    async def find_by_email(self, email: Email) -> User | None:
        pass

    @abstractmethod
    async def find_all(self, limit: int, offset: int) -> tuple[list[User], int]:
        pass

    @abstractmethod
    async def create(self, user: User) -> User:
        pass

    @abstractmethod
    async def update(self, user: User) -> None:
        pass

    @abstractmethod
    async def delete(self, id: str) -> None:
        pass

# 複雑なクエリは専用のクエリサービスで
class UserQueryService:
    """読み取り専用のクエリサービス"""

    async def find_active_users_with_recent_orders(
        self,
        min_order_count: int,
    ) -> list[UserSummary]:
        # CQRS の読み取りモデル用
        pass
```

---

## 5. 値オブジェクトの Primitive Obsession

### 説明

プリミティブ型（string, int など）をそのまま使用すると、バリデーションロジックが散在し、ドメインの表現力が低下します。

### 悪い例

```python
# ❌ 悪い例: プリミティブ型をそのまま使用
@dataclass
class User:
    id: str
    email: str      # プリミティブ
    first_name: str # プリミティブ
    last_name: str  # プリミティブ

# バリデーションが散在
def validate_email(email: str) -> bool:
    # ...

def format_full_name(first_name: str, last_name: str) -> str:
    # ...
```

### 良い例

```python
# ✅ 良い例: 値オブジェクトで表現
@dataclass(frozen=True)
class Email:
    value: str

    def __post_init__(self) -> None:
        if not self._is_valid(self.value):
            raise UserValidationError("無効なメールアドレス")
        object.__setattr__(self, "value", self.value.lower())

    @staticmethod
    def _is_valid(value: str) -> bool:
        # バリデーションロジックが一箇所に
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, value))


@dataclass(frozen=True)
class UserName:
    first_name: str
    last_name: str

    @property
    def full_name(self) -> str:
        # 関連ロジックが一箇所に
        return f"{self.last_name} {self.first_name}"


@dataclass
class User:
    email: Email    # 値オブジェクト
    name: UserName  # 値オブジェクト
```

---

## 6. レイヤー間の不適切な依存

### 説明

レイヤー間の依存関係が正しくないと、保守性とテスト容易性が低下します。

### 悪い例

```python
# ❌ 悪い例: ドメイン層がインフラ層に依存
# src/modules/user/domain/entity.py
from sqlalchemy import Column, String  # インフラ層への依存
from src.infrastructure.database import Base

class User(Base):  # ORM への直接依存
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    email = Column(String)
```

### 良い例

```python
# ✅ 良い例: 依存関係の逆転
# src/modules/user/domain/entity.py - 純粋なドメインモデル
@dataclass
class User(AggregateRoot):
    email: Email
    name: UserName

# src/modules/user/domain/repository.py - インターフェース
class UserRepository(ABC):
    @abstractmethod
    async def find_by_id(self, id: str) -> User | None:
        pass

# src/adapter/repository/user/sqlalchemy_user_repo.py - 実装
class SqlAlchemyUserRepository(UserRepository):
    """SQLAlchemy を使用したリポジトリ実装"""

    async def find_by_id(self, id: str) -> User | None:
        # ORM はアダプター層でのみ使用
        row = await self._session.get(UserModel, id)
        if row is None:
            return None
        return self._to_domain(row)
```

### 正しい依存関係

```
adapters → application → domain ← infrastructure
                      ↑
                      └── repository interfaces
```

---

## まとめ

| アンチパターン               | 問題                       | 解決策                       |
| ---------------------------- | -------------------------- | ---------------------------- |
| Anemic Domain Model          | ビジネスロジックの散在     | エンティティにロジックを配置 |
| ドメインサービスの過度な使用 | Anemic Domain Model と同様 | 適切な場所にロジックを配置   |
| 過度に大きな集約             | パフォーマンス・競合問題   | 集約を小さく保つ             |
| リポジトリの過度な複雑化     | 保守性の低下               | シンプルなインターフェース   |
| Primitive Obsession          | バリデーションの散在       | 値オブジェクトを使用         |
| レイヤー間の不適切な依存     | テスト容易性・保守性の低下 | 依存関係の逆転               |

これらのアンチパターンを避けることで、保守性が高く、テストしやすいドメインモデルを構築できます。
