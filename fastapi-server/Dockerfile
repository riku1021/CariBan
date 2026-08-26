# syntax=docker/dockerfile:1.7

# =============================================================================
# マルチステージビルド Dockerfile
# 方針:
# - builder でのみ uv を使う（バイナリは公式イメージからコピー）
# - 本番 runtime は python:3.13-slim（base から派生し、uv を最終イメージに残さない）
# - ヘルスチェックは curl ではなく Python 標準ライブラリ
# 参考: https://docs.astral.sh/uv/guides/integration/docker/
# =============================================================================

# =============================================================================
# 共通ベース
# =============================================================================
FROM python:3.13-slim AS base

WORKDIR /app

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_PYTHON_DOWNLOADS=0

# =============================================================================
# ステージ1: 本番用依存のビルド
# =============================================================================
FROM base AS builder

COPY --from=ghcr.io/astral-sh/uv:0.11.8 /uv /uvx /bin/

ENV UV_LINK_MODE=copy

COPY pyproject.toml uv.lock ./

# ロックファイルどおりの依存のみ（プロジェクト本体は src コピーで運用するため未インストール）
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --no-install-project --compile-bytecode

# =============================================================================
# ステージ1.5: 開発用依存のビルド
# =============================================================================
FROM base AS builder-dev

COPY --from=ghcr.io/astral-sh/uv:0.11.8 /uv /uvx /bin/

ENV UV_LINK_MODE=copy

COPY pyproject.toml uv.lock ./

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-install-project --all-groups && \
    test -f .venv/bin/uvicorn

# =============================================================================
# ステージ2: 本番ランタイム
# =============================================================================
FROM base AS runtime

ENV ENV=prod \
    PATH="/app/.venv/bin:$PATH"

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates && \
    curl -sfS https://dotenvx.sh | sh && \
    apt-get purge -y curl && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

RUN groupadd -r appuser && \
    useradd -r -g appuser -d /app -s /usr/sbin/nologin appuser

COPY --from=builder /app/.venv /app/.venv

COPY --chown=appuser:appuser src/ ./src/
COPY --chown=appuser:appuser alembic/ ./alembic/
COPY --chown=appuser:appuser alembic.ini ./
COPY --chown=appuser:appuser envs/ ./envs/

EXPOSE 8000

USER appuser

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=5)"

CMD ["gunicorn", "src.main:app", \
     "-w", "4", \
     "-k", "uvicorn.workers.UvicornWorker", \
     "-b", "0.0.0.0:8000", \
     "--timeout", "30", \
     "--keep-alive", "5", \
     "--access-logfile", "-", \
     "--error-logfile", "-"]

# =============================================================================
# ステージ3: 開発用ランタイム（uv は開発時コマンド用に残す）
# =============================================================================
FROM base AS runtime-dev

COPY --from=ghcr.io/astral-sh/uv:0.11.8 /uv /uvx /bin/

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates && \
    curl -sfS https://dotenvx.sh | sh && \
    apt-get purge -y curl && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

ENV ENV=dev \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PATH="/app/.venv/bin:$PATH"

COPY --from=builder-dev /app/.venv /app/.venv
COPY pyproject.toml uv.lock ./
COPY src/ ./src/
COPY alembic/ ./alembic/
COPY alembic.ini ./
COPY envs/ ./envs/

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=5)"

CMD ["uv", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
