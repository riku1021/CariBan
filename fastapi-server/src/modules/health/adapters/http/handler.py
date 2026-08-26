"""ヘルスチェック HTTP ハンドラー（health モジュール内）。

監視用のシンプルなヘルスチェックエンドポイントを提供します。
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from src.adapter.http.dependencies import get_health_check_usecase
from src.modules.health.application import HealthCheckUseCase

router = APIRouter()


class HealthResponseModel(BaseModel):
    """ヘルスチェック API レスポンスモデル"""

    status: str
    timestamp: str


@router.get("/health")
async def health_check(
    usecase: HealthCheckUseCase = Depends(get_health_check_usecase),
) -> HealthResponseModel:
    """ヘルスチェックエンドポイント。

    Args:
        usecase: ヘルスチェックユースケース

    Returns:
        ヘルスステータスレスポンス
    """
    status = await usecase.execute()

    return HealthResponseModel(
        status=status.status,
        timestamp=status.timestamp.isoformat(),
    )
