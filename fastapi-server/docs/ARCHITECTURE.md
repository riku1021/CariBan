# アーキテクチャガイド

このドキュメントでは、FastAPI サーバーテンプレートの Pragmatic Clean Architecture（Vertical Slice）を視覚的に説明します。

---

## 1. 依存関係の方向

```mermaid
graph TB
    subgraph adapters [Adapter]
        A[HTTP Handler]
        B[Repository 実装]
    end

    subgraph application [Application]
        C[Commands]
        D[Queries]
    end

    subgraph domainLayer [Domain]
        E[Entities]
        F[Value Objects]
        G[Repository Port]
        H[Domain Services]
        I[Domain Events]
    end

    subgraph infrastructure [Infrastructure]
        J[Config]
        K[Logger]
        L[Middleware]
        M[Event Dispatcher]
    end

    A --> C
    A --> D
    B --> G
    C --> E
    C --> G
    C --> H
    D --> E
    D --> G
    M --> I
```

| レイヤー | 依存先 | 説明 |
| --- | --- | --- |
| Adapter | Application, Domain | HTTP と永続化の入口 |
| Application | Domain | コマンド / クエリ |
| Domain | なし | 純粋なビジネスロジック |
| Infrastructure | Domain のポートのみ | 設定・ログ・DB 接続 |

---

## 2. CQRS パターン

### コマンドとクエリの分離

```mermaid
graph LR
    subgraph "HTTP Handler"
        H1[POST /users]
        H2[PUT /users/:id]
        H3[GET /users/:id]
        H4[GET /users]
    end

    subgraph "Commands"
        C1[CreateUserCommand]
        C2[UpdateUserProfileCommand]
    end

    subgraph "Queries"
        Q1[GetUserQuery]
        Q2[ListUsersQuery]
    end

    subgraph "Repository"
        R[UserRepository]
    end

    H1 --> C1
    H2 --> C2
    H3 --> Q1
    H4 --> Q2

    C1 --> R
    C2 --> R
    Q1 --> R
    Q2 --> R

    classDef command fill:#ffcdd2
    classDef query fill:#c8e6c9
    classDef handler fill:#e3f2fd

    class C1,C2 command
    class Q1,Q2 query
    class H1,H2,H3,H4 handler
```

### コマンドとクエリの特性

| 種類    | 特性             | 例                     |
| ------- | ---------------- | ---------------------- |
| Command | 状態を変更する   | Create, Update, Delete |
| Query   | 状態を変更しない | Get, List, Search      |

---

## 3. Aggregate Root と集約

### User 集約の構造

```mermaid
graph TB
    subgraph "User 集約"
        U[User<br/>Aggregate Root]
        P[UserProfile<br/>集約内エンティティ]
        E[Email<br/>値オブジェクト]
        N[UserName<br/>値オブジェクト]
    end

    subgraph "外部集約"
        O[Order]
        C[Comment]
    end

    U --> P
    U --> E
    U --> N
    U -.->|ID 参照| O
    U -.->|ID 参照| C

    classDef root fill:#ffeb3b
    classDef entity fill:#fff9c4
    classDef vo fill:#e8f5e9
    classDef external fill:#f5f5f5

    class U root
    class P entity
    class E,N vo
    class O,C external
```

### 集約のルール

1. **Aggregate Root を通じてのみアクセス**: `User.update_profile()` を使用
2. **外部集約は ID で参照**: `customer_id: str` のように
3. **1 トランザクション = 1 集約**: 集約間の整合性は結果整合性

---

## 4. ドメインイベントフロー

### イベントの発行と処理

```mermaid
sequenceDiagram
    participant H as HTTP Handler
    participant C as Command
    participant E as Entity
    participant R as Repository
    participant D as IEventDispatcher
    participant EH as EventHandler

    H->>C: execute(request)
    C->>E: create()
    E->>E: add_domain_event()
    C->>R: create(entity)
    R-->>C: created_entity
    C->>E: get_domain_events()
    C->>D: dispatch_all(events)
    D->>EH: handle(event)
    EH-->>D: 処理完了
    C->>E: clear_domain_events()
    C-->>H: response
```

### イベントの種類

```mermaid
graph TB
    subgraph "ドメインイベント"
        DE[DomainEvent<br/>基底クラス]
        UC[UserCreatedEvent]
        UPU[UserProfileUpdatedEvent]
        UD[UserDeactivatedEvent]
        SC[SampleCreatedEvent]
    end

    DE --> UC
    DE --> UPU
    DE --> UD
    DE --> SC

    classDef base fill:#e1bee7
    classDef event fill:#f3e5f5

    class DE base
    class UC,UPU,UD,SC event
```

---

## 5. 依存性注入

### 依存関係の解決

```mermaid
graph TB
    subgraph "FastAPI Dependencies"
        D1[get_settings]
        D2[get_event_dispatcher]
        D3[get_user_repository]
        D4[get_user_domain_service]
        D5[get_create_user_command]
    end

    subgraph "Components"
        S[Settings]
        ED[IEventDispatcher]
        UR[UserRepository]
        DS[UserDomainService]
        CC[CreateUserCommand]
    end

    D1 --> S
    D2 --> ED
    D3 --> UR
    D4 --> DS
    D4 --> D3
    D5 --> CC
    D5 --> D4
    D5 --> D2

    classDef dep fill:#e3f2fd
    classDef comp fill:#fff3e0

    class D1,D2,D3,D4,D5 dep
    class S,ED,UR,DS,CC comp
```

---

## 6. ディレクトリ構造

```text
fastapi-server/
├── src/
│   ├── main.py                 # エントリポイント
│   ├── bootstrap/              # FastAPI 組み立て・ルーター集約
│   ├── modules/<context>/      # health / sample / user
│   │   ├── domain/
│   │   ├── application/
│   │   ├── adapters/http/
│   │   ├── infrastructure/
│   │   └── public/
│   ├── adapter/
│   │   ├── http/               # DI（dependencies.py）とミドルウェア入口
│   │   └── repository/         # Port の具象（当面インメモリ）
│   ├── infrastructure/         # config / logger / middleware / events / db
│   └── shared/                 # 共通エラー・イベントポート・HTTP 例外ハンドラ
└── alembic/                    # DB マイグレーション
```

新機能は `src/modules/<context>/` に追加し、`src/bootstrap/router_registry.py` で `/api` 配下に登録します。

---

## 7. エラーハンドリングフロー

### エラーの伝播と変換

```mermaid
graph TB
    subgraph "Domain 層"
        VE[ValidationError]
        NF[NotFoundError]
        CE[ConflictError]
    end

    subgraph "Application 層"
        UC[Command / Query]
    end

    subgraph "Adapter 層"
        EH[Exception Handler]
    end

    subgraph "HTTP Response"
        R400[400 Bad Request]
        R404[404 Not Found]
        R409[409 Conflict]
    end

    VE --> UC
    NF --> UC
    CE --> UC
    UC --> EH
    EH --> R400
    EH --> R404
    EH --> R409

    classDef error fill:#ffcdd2
    classDef response fill:#c8e6c9

    class VE,NF,CE error
    class R400,R404,R409 response
```

---

## 8. Specification パターン

### 複合 Specification

```mermaid
graph TB
    subgraph "基底クラス"
        S[Specification]
    end

    subgraph "複合 Specification"
        AND[AndSpecification]
        OR[OrSpecification]
        NOT[NotSpecification]
    end

    subgraph "具体 Specification"
        AU[ActiveUserSpecification]
        HP[HasProfileSpecification]
        ED[EmailDomainSpecification]
    end

    S --> AND
    S --> OR
    S --> NOT
    S --> AU
    S --> HP
    S --> ED

    AU --> AND
    HP --> AND

    classDef base fill:#e1bee7
    classDef composite fill:#f3e5f5
    classDef concrete fill:#fff3e0

    class S base
    class AND,OR,NOT composite
    class AU,HP,ED concrete
```

### 使用例

```python
# アクティブで完全なプロファイルを持つユーザー
spec = (
    ActiveUserSpecification()
    & HasCompleteProfileSpecification()
    & EmailDomainSpecification("company.com")
)

matching_users = [u for u in users if spec.is_satisfied_by(u)]
```

---

## まとめ

このテンプレートは以下の DDD パターンを実装しています：

1. **Pragmatic Clean Architecture（Vertical Slice）**: コンテキスト単位で依存関係の方向を厳密に管理
2. **CQRS**: コマンドとクエリの分離
3. **Aggregate Root**: 集約の境界と整合性
4. **ドメインイベント**: イベント駆動アーキテクチャ
5. **Specification パターン**: 再利用可能なビジネスルール
6. **依存性注入**: テスト容易性と柔軟性
