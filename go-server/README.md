# CariBan go-server

Go（`net/http`）+ Pragmatic Clean Architecture のバックエンドです。セットアップと起動手順はリポジトリルートの [README.md](../README.md) を参照してください。

## 開発コマンド

```bash
cd go-server
go mod download
mise run go:dev              # dotenvx で env 復号 → go run
mise run compose:go-dev      # Docker Compose（Go dev）
go test ./...
gofmt -w .
go vet ./...
```

マイグレーション（PostgreSQL が起動している場合）:

```bash
mise exec -- dotenvx run -f envs/.env.dev -fk envs/.env.keys --no-native -- go run ./cmd/migrate
```

環境変数は `envs/.env.dev` / `envs/.env.prod`（暗号化、commit）と `envs/.env.keys`（gitignore）で管理します。

## ドキュメント

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- [ANTIPATTERNS.md](./docs/ANTIPATTERNS.md)
