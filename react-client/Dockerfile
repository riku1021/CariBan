# =============================================================================
# マルチステージビルド対応統合Dockerfile
# =============================================================================

FROM node:20-slim AS base

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# =============================================================================
# 開発環境ステージ
# =============================================================================
FROM base AS development

# prepare（panda codegen）は panda.config.ts コピー前に走らないよう抑制
RUN pnpm install --ignore-scripts

COPY . .

RUN pnpm exec panda codegen

EXPOSE 3000

CMD ["pnpm", "dev"]

# =============================================================================
# ビルドステージ
# =============================================================================
FROM base AS build

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm exec panda codegen

ARG VITE_API_BASE_URL=http://localhost
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN pnpm build

# =============================================================================
# 本番環境ステージ
# =============================================================================
FROM node:20-slim AS production

WORKDIR /app

RUN npm install -g serve@14

COPY --from=build /app/dist ./dist

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]
