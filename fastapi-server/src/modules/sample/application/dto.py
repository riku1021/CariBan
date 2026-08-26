"""sample モジュールのユースケース DTO 定義。"""

from dataclasses import dataclass
from datetime import datetime

# =============================================================================
# コマンド（書き込み操作）DTO
# =============================================================================


@dataclass
class CreateSampleRequest:
    """サンプル作成リクエスト DTO

    新しいサンプルを作成するために必要なデータのみを含みます。
    """

    name: str
    description: str | None = None


@dataclass
class CreateSampleResponse:
    """サンプル作成レスポンス DTO

    作成されたサンプルの情報を含みます。
    エラーは例外として投げられるため、success フィールドは不要です。
    """

    id: str
    name: str
    created_at: datetime


# =============================================================================
# クエリ（読み取り操作）DTO
# =============================================================================


@dataclass
class GetSampleResponse:
    """サンプル詳細レスポンス DTO

    単一のサンプルに関するすべての情報を含みます。
    """

    id: str
    name: str
    description: str | None
    created_at: datetime
    updated_at: datetime


@dataclass
class ListSamplesRequest:
    """サンプル一覧リクエスト DTO

    ページネーションとフィルターパラメータを含みます。
    """

    limit: int = 10
    offset: int = 0
    # TODO: 必要に応じてフィルターフィールドを追加
    # search: Optional[str] = None
    # status: Optional[str] = None


@dataclass
class SampleItem:
    """一覧レスポンス用のサンプルアイテム DTO

    効率のため GetSampleResponse より少ないフィールドを含む場合があります。
    """

    id: str
    name: str
    created_at: datetime


@dataclass
class ListSamplesResponse:
    """サンプル一覧レスポンス DTO

    ページネーションされた一覧と総数を含みます。
    """

    items: list[SampleItem]
    total: int
    limit: int
    offset: int
