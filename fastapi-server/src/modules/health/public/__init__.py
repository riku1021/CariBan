"""health モジュールの公開 API。

他モジュールやアプリケーション最外層から health コンテキストにアクセスするための
窓口として機能します。
"""

from src.modules.health.application import HealthCheckUseCase
from src.modules.health.domain import HealthStatus

__all__ = ["HealthStatus", "HealthCheckUseCase"]
