"""ミドルウェア設定統合

すべてのミドルウェアを適切な順序で設定します。
"""

from fastapi import FastAPI

from ..config.settings import load_settings
from ..logger.logger import logger
from .cors import setup_cors
from .gzip import setup_gzip
from .logging import setup_logging_middleware
from .security_headers import setup_security_headers


def setup_middleware(app: FastAPI) -> None:
    """すべてのミドルウェアを設定

    ミドルウェアの順序が重要です：
    1. GZip（最外層）- レスポンスを圧縮
    2. セキュリティヘッダー - セキュリティヘッダーを追加
    3. CORS - クロスオリジンリクエストを処理
    4. ロギング（最内層）- リクエスト/レスポンスをログに記録

    Args:
        app: FastAPI アプリケーション
    """
    # 設定を読み込み
    settings = load_settings()
    security_config = settings.get_security_headers_config()

    # GZip 圧縮を設定（最外層）
    setup_gzip(app)

    # セキュリティヘッダーを設定
    setup_security_headers(app, security_config)

    # CORS を設定
    setup_cors(app)

    # ロギングミドルウェアを設定（最内層）
    setup_logging_middleware(app)

    logger.debug("すべてのミドルウェアの設定が完了しました")
