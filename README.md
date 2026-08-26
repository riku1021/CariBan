# CariBan

Panda CSS フロントエンドと、FastAPI または Go のバックエンド（Pragmatic Clean Architecture）を組み合わせたフルスタックテンプレートです。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 技術スタック

| 領域 | 技術 |
|------|------|
| フロント | React 19, Vite, TanStack Router, TanStack Query, Jotai, Panda CSS, pnpm |
| バックエンド（Python） | FastAPI, uv, Pydantic, SQLAlchemy / Alembic |
| バックエンド（Go） | net/http, godotenv, pgx, goose |
| インフラ | Docker Compose, PostgreSQL 18, nginx |
| ツール | mise, dotenvx, Lefthook, Biome, Ruff, mypy, gofmt |

## ディレクトリ構成

```text
CariBan/
├── react-client/    # フロントエンド
├── fastapi-server/  # FastAPI バックエンド
├── go-server/       # Go バックエンド
├── nginx/           # リバースプロキシ設定
├── docker-compose.yml
└── .mise.toml
```

`fastapi-server/` と `go-server/` は併存します。Compose のプロファイルでどちらを起動するか選びます。

## 前提条件

- [mise](https://mise.jdx.dev/)
- [Docker](https://docs.docker.com/get-docker/) / Docker Compose
- Git フック用 [Lefthook](https://github.com/evilmartians/lefthook)（任意）: `brew install lefthook` のあとリポジトリルートで `lefthook install`

## セットアップ

```sh
mise trust
mise install
mise sync python --uv
```

`mise install` の `postinstall` で `install-deps` が走り、`react-client` / `fastapi-server` / `go-server` の依存インストールまで進みます。

**環境変数**: 各パッケージの `envs/.env.keys`（復号鍵）をチームから受け取り配置してください。無い場合は [環境変数](#環境変数) を参照。

依存関係だけ入れ直す場合:

```sh
mise run install-deps
```

手動で分ける場合:

```sh
# react-client
cd react-client && pnpm install

# fastapi-server（ルートで mise を使うなら先に `mise sync python --uv`）
cd fastapi-server && uv sync

# go-server
cd go-server && go mod download
```

## 環境変数

`react-client` / `fastapi-server` / `go-server` はいずれも [dotenvx](https://dotenvx.com/docs/quickstart/encryption) で `envs/.env.dev` / `envs/.env.prod` を暗号化して Git に含めます。復号鍵 `envs/.env.keys` だけ gitignore し、チーム内で別途共有します（[dotenvx の運用例](https://zenn.dev/dgtech/articles/dc854595affade)）。

| パッケージ | 暗号化 env | 復号鍵 | ローカル起動 | Compose 起動 |
|---|---|---|---|---|
| react-client | `react-client/envs/.env.dev` / `.env.prod` | `react-client/envs/.env.keys` | `pnpm dev` | （フロント dev サーバー） |
| fastapi-server | `fastapi-server/envs/.env.dev` / `.env.prod` | `fastapi-server/envs/.env.keys` | `mise run fastapi-server:dev` | `mise run compose:dev` |
| go-server | `go-server/envs/.env.dev` / `.env.prod` | `go-server/envs/.env.keys` | `mise run go:dev` | `mise run compose:go-dev` |

Compose では [dotenvx 公式の Docker Compose 方式](https://dotenvx.com/docs/docker-compose/)に従い、コンテナ内で `dotenvx run` して復号します。ホスト側は `docker compose --env-file <pkg>/envs/.env.keys` で復号鍵だけ渡します（平文 `.env` は生成しません）。

### 初回（鍵が無いとき）

```sh
# チームから各 envs/.env.keys を受け取る

# 自分で鍵を切る場合（テンプレート初期化）:
cd react-client
pnpm exec dotenvx encrypt -f envs/.env.dev -fk envs/.env.keys --no-native --no-armor
pnpm exec dotenvx encrypt -f envs/.env.prod -fk envs/.env.keys --no-native --no-armor

# fastapi-server / go-server も同様、または:
mise run env:encrypt
```

### 値の更新

```sh
# react-client
cd react-client
pnpm exec dotenvx set VITE_API_BASE_URL "http://localhost" -f envs/.env.dev --no-native

# fastapi-server
cd fastapi-server
mise exec -- dotenvx set DATABASE_URL "postgresql+asyncpg://..." -f envs/.env.dev -fk envs/.env.keys --no-native

# go-server
cd go-server
mise exec -- dotenvx set DATABASE_URL "postgres://..." -f envs/.env.dev -fk envs/.env.keys --no-native
```

### 主な変数（fastapi-server / go-server）

- `HOST` / `PORT`（既定 `8000`。nginx の 80 とは別）
- `LOG_LEVEL`（未設定時は `ENV=prod` なら `INFO`、それ以外は `DEBUG`。別名は受け付けない）
  - FastAPI: `DEBUG` / `INFO` / `WARNING` / `ERROR` / `CRITICAL`
  - Go: `DEBUG` / `INFO` / `WARN` / `ERROR`
- `DATABASE_URL`（ホストから Postgres へ繋ぐ場合は `localhost:5432`）
  - FastAPI: `postgresql+asyncpg://...`
  - Go: `postgres://...?sslmode=disable`

Docker Compose 起動時はコンテナ内の `DATABASE_URL` がサービス名 `postgres` 向けに上書きされます。

### クライアント（`react-client/envs/`）

`pnpm dev` / `pnpm build` は `dotenvx run` で復号してから Vite を起動します（`--mode dev` → `.env.dev`、`--mode prod` → `.env.prod`）。

- `VITE_API_BASE_URL=http://localhost`（nginx 同一オリジン）

CI / Docker 本番ビルドでは `VITE_API_BASE_URL` をプロセス環境に置くか、`DOTENV_PRIVATE_KEY_PROD` を渡します。既存の環境変数は `.env` より優先されます。

## 起動

### Docker（推奨）

FastAPI 開発環境:

```sh
mise run compose:dev
```

Go 開発環境:

```sh
mise run compose:go-dev
```

本番相当:

```sh
mise run compose:prod
mise run compose:go-prod
```

手動で起動する場合（復号鍵を Compose に渡す）:

```sh
docker compose --env-file fastapi-server/envs/.env.keys --profile dev up --build
docker compose --env-file go-server/envs/.env.keys --profile go-dev up --build
```

終了:

```sh
docker compose --profile dev down
docker compose --profile go-dev down
```

### ローカル（Docker なし）

PostgreSQL を別途用意したうえで:

```sh
# FastAPI
mise run fastapi-server:dev

# Go
mise run go:dev

# react-client（別ターミナル）
cd react-client
pnpm dev
```

ローカルで Vite 直アクセスする場合は `dotenvx set` で `react-client/envs/.env.dev` の `VITE_API_BASE_URL` を `http://localhost:8000` にしてください。

## アクセス URL

| 環境 | URL |
|------|-----|
| nginx（dev / prod / go-dev / go-prod） | http://localhost |
| フロント直接（dev） | http://localhost:3000 |
| フロント直接（prod） | http://localhost:4173 |
| バックエンド直接 | http://localhost:8000 |
| Swagger UI（FastAPI のみ） | http://localhost:8000/docs（nginx 経由は `/docs` ではなくバックエンド直） |
| ヘルスチェック | http://localhost/health |

nginx は `/` をフロントへ、`/api/*` と `/health` をバックエンドへプロキシします。

## 新機能の追加

- **FastAPI**: `fastapi-server/src/modules/<context>/` に domain / application / adapters を追加し、`fastapi-server/src/bootstrap/router_registry.py` で `/api` 配下に登録する。詳細は [fastapi-server/README.md](./fastapi-server/README.md) と [fastapi-server/docs/ARCHITECTURE.md](./fastapi-server/docs/ARCHITECTURE.md)。
- **Go**: `go-server/internal/modules/<context>/` に domain / application / adapters を追加し、`go-server/internal/bootstrap/server.go` で登録する。詳細は [go-server/README.md](./go-server/README.md) と [go-server/docs/ARCHITECTURE.md](./go-server/docs/ARCHITECTURE.md)。
- **クライアント**: `react-client/src/features/<feature>/` に api / hooks / components を追加し、`react-client/src/routes/` から組み合わせる。

## 開発コマンド

```sh
# react-client
cd react-client
pnpm dev
pnpm lint
pnpm lint:ci
pnpm fix
pnpm typecheck
pnpm build

# fastapi-server
cd fastapi-server
uv run pytest
uv run ruff check src/ tests/
uv run mypy src/
uv run lint-imports

# go-server
cd go-server
go test ./...
gofmt -l .
go vet ./...
```

Panda CSS の生成物 `react-client/src/styled-system/` は git 管理しません。`pnpm install`（`prepare`: `panda codegen`）で生成されます。開発中の CSS は Vite の PostCSS（`@pandacss/dev/postcss`）がトークン変更に追従します。
