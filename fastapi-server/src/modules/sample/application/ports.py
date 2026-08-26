"""sample モジュールのポート定義。

アプリケーション層から参照されるリポジトリなどの抽象インターフェースを集約します。
"""

from src.modules.sample.domain import SampleRepository

__all__ = ["SampleRepository"]
