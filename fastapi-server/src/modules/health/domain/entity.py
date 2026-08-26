"""ヘルスチェックエンティティ（health モジュール内）。"""

from dataclasses import dataclass
from datetime import datetime


@dataclass
class HealthStatus:
    """ヘルスステータスエンティティ。"""

    status: str
    timestamp: datetime

    @classmethod
    def healthy(cls) -> "HealthStatus":
        """正常なステータスを作成。"""
        return cls(
            status="healthy",
            timestamp=datetime.now(),
        )
