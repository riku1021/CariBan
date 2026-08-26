# Docker環境の使用方法

このプロジェクトでは、マルチステージビルドを活用した統合Dockerfileを使用しています。開発環境と本番環境の両方に対応し、効率的なイメージ管理を実現しています。

Compose サービス名はディレクトリ名に揃えています（`react-client-dev` / `react-client-prod`）。起動はリポジトリルートから行います。

## 開発環境の起動

FastAPI 開発環境（`react-client-dev` + `fastapi-server-dev` + nginx）:

```bash
mise run compose:dev
```

Go 開発環境（`react-client-go-dev` + `go-server-dev` + nginx）:

```bash
mise run compose:go-dev
```

手動で起動する場合:

```bash
docker compose --env-file fastapi-server/envs/.env.keys --profile dev up --build
```

このコマンドで開発サーバーが起動し、以下の機能が利用可能になります：

- ホットリロード（ソースコードの変更がリアルタイムで反映）
- 開発用ポート（3000）でのアクセス（nginx 経由は http://localhost）
- デバッグツールの利用
- 全依存関係（devDependenciesを含む）のインストール

## 本番環境の起動

FastAPI 本番相当（`react-client-prod` + `fastapi-server-prod` + nginx）:

```bash
mise run compose:prod
```

Go 本番相当:

```bash
mise run compose:go-prod
```

このコマンドで本番ビルドが作成され、以下の機能が利用可能になります：

- 最適化されたビルド（TypeScript + Vite）
- Vite previewサーバーでの配信
- 本番用ポート（4173）でのアクセス（nginx 経由は http://localhost）
- 本番用依存関係のみのインストール（軽量化）

## ビルドのみ実行する場合

フロントの本番イメージだけをビルドする場合:

```bash
docker compose --profile prod build react-client-prod
```

## 環境変数の設定

フロントの環境変数は `react-client/envs/.env.dev` / `.env.prod`（dotenvx 暗号化）で管理します。Compose 起動時はルートの `docker-compose.yml` が復号鍵を渡します。詳細はリポジトリルートの [README.md](../README.md) を参照してください。

### コンテナの停止

```bash
docker compose --profile dev down
docker compose --profile prod down
```

### イメージの再ビルド

```bash
docker compose --profile dev build --no-cache
```

### ログの確認

```bash
docker compose --profile dev logs -f react-client-dev
```

## マルチステージビルドの構成

統合Dockerfileは以下のステージで構成されています：

### 1. baseステージ

- Node.js 20-slimベースイメージ
- pnpmの設定
- package.json/pnpm-lock.yamlのコピー

### 2. developmentステージ

- 開発用依存関係の全インストール
- ホットリロード対応の開発サーバー起動

### 3. buildステージ

- 本番用ビルドの実行
- TypeScript + Viteによる最適化

### 4. productionステージ

- 本番用依存関係のみのインストール
- ビルド成果物のコピー
- Vite previewサーバーでの配信

## 注意事項

- 開発環境では`node_modules`がボリュームマウントされているため、依存関係の変更時はコンテナを再起動する必要があります
- 本番環境では`--frozen-lockfile`を使用して依存関係を固定しています
- ポート番号は必要に応じてルートの `docker-compose.yml` で変更可能です
- 統合Dockerfileにより、環境ごとの設定を一元管理しています
- マルチステージビルドにより、本番イメージのサイズを最適化しています
