"""アプリケーションのログ設定

アプリケーション全体でインポートして使用できる
集中管理されたロガーを提供します。
"""

import logging
import sys

_APP_LOGGER_NAME = "app"

_LEVELS: dict[str, int] = {
    "DEBUG": logging.DEBUG,
    "INFO": logging.INFO,
    "WARNING": logging.WARNING,
    "ERROR": logging.ERROR,
    "CRITICAL": logging.CRITICAL,
}


def parse_log_level(level_name: str) -> int:
    """ログレベル名を logging の定数に変換する。

    未知の名前は INFO にフォールバックする。
    """
    return _LEVELS.get(level_name.upper(), logging.INFO)


def setup_logger(name: str | None = None, level: int = logging.INFO) -> logging.Logger:
    """アプリケーションロガーをセットアップ

    Args:
        name: ロガー名（デフォルトは app。uvicorn のルートロガーと分離する）
        level: ログレベル

    Returns:
        設定済みのロガーインスタンス
    """
    logger = logging.getLogger(name or _APP_LOGGER_NAME)
    logger.setLevel(level)
    logger.propagate = False

    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(level)

    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    handler.setFormatter(formatter)

    if not logger.handlers:
        logger.addHandler(handler)

    return logger


def configure_logger(level_name: str) -> None:
    """設定読み込み後にアプリロガーのレベルを合わせる。"""
    level = parse_log_level(level_name)
    logger.setLevel(level)
    for handler in logger.handlers:
        handler.setLevel(level)


logger = setup_logger()
