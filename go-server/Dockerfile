# syntax=docker/dockerfile:1.7

# =============================================================================
# マルチステージビルド Dockerfile
# 方針:
# - builder で静的バイナリを作る
# - 本番 runtime は非 root、uv 相当のツールチェーンを残さない
# - 開発 runtime-dev は air によるホットリロード
# =============================================================================

# =============================================================================
# ステージ1: 本番用バイナリのビルド
# =============================================================================
FROM golang:1.24.1-bookworm AS builder

WORKDIR /src

ENV CGO_ENABLED=0 \
    GOOS=linux \
    GOFLAGS="-mod=readonly"

COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

COPY . .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api && \
    go build -trimpath -ldflags="-s -w" -o /out/migrate ./cmd/migrate

# =============================================================================
# ステージ1.5: 開発用ツール
# =============================================================================
FROM golang:1.24.1-bookworm AS builder-dev

WORKDIR /src

ENV CGO_ENABLED=0

COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go install github.com/air-verse/air@v1.62.0

COPY . .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build -o /out/migrate ./cmd/migrate

# =============================================================================
# ステージ2: 本番ランタイム
# =============================================================================
FROM debian:bookworm-slim AS runtime

WORKDIR /app

ENV ENV=prod

RUN groupadd -r appuser && \
    useradd -r -g appuser -d /app -s /usr/sbin/nologin appuser && \
    apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates wget curl && \
    curl -sfS https://dotenvx.sh | sh && \
    apt-get purge -y curl && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder --chown=appuser:appuser /out/api /app/api
COPY --from=builder --chown=appuser:appuser /out/migrate /app/migrate
COPY --chown=appuser:appuser envs/ ./envs/

EXPOSE 8000

USER appuser

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8000/health >/dev/null || exit 1

CMD ["/app/api"]

# =============================================================================
# ステージ3: 開発用ランタイム
# =============================================================================
FROM golang:1.24.1-bookworm AS runtime-dev

WORKDIR /app

ENV ENV=dev \
    CGO_ENABLED=0

RUN apt-get update && \
    apt-get install -y --no-install-recommends wget curl ca-certificates && \
    curl -sfS https://dotenvx.sh | sh && \
    apt-get purge -y curl && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder-dev /go/bin/air /usr/local/bin/air
COPY --from=builder-dev /out/migrate /usr/local/bin/migrate

COPY go.mod go.sum ./
COPY .air.toml ./
COPY cmd/ ./cmd/
COPY internal/ ./internal/
COPY migrations/ ./migrations/
COPY envs/ ./envs/

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8000/health >/dev/null || exit 1

CMD ["air", "-c", ".air.toml"]
