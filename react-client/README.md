# CariBan react-client

Panda CSS + TanStack Router + Jotai のフロントエンドです。セットアップはリポジトリルートの [README.md](../README.md) を参照してください。

`pnpm install` 時に `panda codegen` が走り、`src/styled-system/` が生成されます（git 管理外）。開発中の CSS は Vite の PostCSS プラグインが更新します。

環境変数は dotenvx で暗号化します。`pnpm dev` は `dotenvx run` 経由です。鍵は `envs/.env.keys`（git 管理外）。詳細はリポジトリルートの [README.md](../README.md) を参照してください。

```sh
pnpm install   # panda codegen も実行される
pnpm dev
pnpm build
pnpm lint      # biome check
pnpm fix       # biome check --write
pnpm typecheck
```
