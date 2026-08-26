"""ヘルスチェックユースケース（health モジュール内）。"""

from src.modules.health.domain import HealthStatus


class HealthCheckUseCase:
    """ヘルスチェックユースケース。

    依存関係を必要としないシンプルなユースケースです。
    """

    async def execute(self) -> HealthStatus:
        """ヘルスチェックを実行してステータスを返す。"""
        return HealthStatus.healthy()
