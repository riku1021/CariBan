# CariBan fastapi-server

FastAPI + Pragmatic Clean Architecture のバックエンドです。セットアップと起動手順はリポジトリルートの [README.md](../README.md) を参照してください。

## 開発コマンド

```bash
cd fastapi-server
uv sync
mise run fastapi-server:dev          # dotenvx で env 復号 → uvicorn
mise run compose:dev         # Docker Compose（FastAPI dev）
uv run pytest
uv run ruff check src/ tests/
uv run mypy src/
uv run lint-imports
```

環境変数は `envs/.env.dev` / `envs/.env.prod`（暗号化、commit）と `envs/.env.keys`（gitignore）で管理します。

## ドキュメント

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- [ANTIPATTERNS.md](./docs/ANTIPATTERNS.md)
- [EVENT_SOURCING.md](./docs/EVENT_SOURCING.md)
