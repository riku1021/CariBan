# アーキテクチャガイド

このドキュメントでは、Go サーバーテンプレートの Pragmatic Clean Architecture（Vertical Slice）を説明します。

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

## 2. ディレクトリ構成

```text
go-server/
├── cmd/api/                 # エントリポイント
├── cmd/migrate/             # goose マイグレーション
├── internal/
│   ├── bootstrap/           # 手動 DI と HTTP 組み立て
│   ├── modules/<context>/   # health / sample / user
│   │   ├── domain/
│   │   ├── application/
│   │   ├── adapters/http/
│   │   ├── infrastructure/
│   │   └── public/
│   ├── adapter/repository/  # Port の具象（当面インメモリ）
│   ├── infrastructure/      # config / logger / middleware / db
│   └── shared/              # 共通エラー・イベント・HTTP ヘルパー
└── migrations/              # goose SQL
```

新機能は `internal/modules/<context>/` に追加し、`internal/bootstrap/server.go` で `/api` 配下に登録します。

---

## 3. CQRS

```mermaid
graph LR
    subgraph httpHandler [HTTP Handler]
        H1[POST /api/users]
        H2[PUT /api/users/id/profile]
        H3[GET /api/users/id]
        H4[GET /api/users]
    end

    subgraph commands [Commands]
        C1[CreateUserCommand]
        C2[UpdateUserProfileCommand]
    end

    subgraph queries [Queries]
        Q1[GetUserQuery]
        Q2[ListUsersQuery]
    end

    subgraph repository [Repository]
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
```

| 種類 | 特性 | 例 |
| --- | --- | --- |
| Command | 状態を変更する | Create, Update, Deactivate |
| Query | 状態を変更しない | Get, List |

---

## 4. HTTP 契約

| Method | Path | 説明 |
| --- | --- | --- |
| GET | `/health` | ヘルスチェック（prefix なし） |
| GET/POST | `/api/samples` | サンプル一覧 / 作成 |
| GET | `/api/samples/{id}` | サンプル取得 |
| GET/POST | `/api/users` | ユーザー一覧 / 作成 |
| GET | `/api/users/{id}` | ユーザー取得 |
| PUT | `/api/users/{id}/profile` | プロファイル更新 |
| DELETE | `/api/users/{id}` | 非アクティブ化 |

ドメインエラーは `shared/http` で HTTP ステータスへ変換します（400 / 404 / 409 / 500）。

---

## 5. 永続化

sample / user のリポジトリ実装は当面インメモリです。PostgreSQL は `DATABASE_URL` で接続確認し、goose で初期スキーマを適用します。差し替えるときは `internal/adapter/repository/` に pgx 実装を追加し、`bootstrap` の組み立てだけを変更します。
