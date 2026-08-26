"""HTTP 関連の共通コンポーネント。

FastAPI のグローバル例外ハンドラーなど、複数モジュール・エンドポイントで
共通利用される HTTP レベルの部品をここに集約します。
"""

from .exception_handlers import setup_exception_handlers

__all__ = ["setup_exception_handlers"]
