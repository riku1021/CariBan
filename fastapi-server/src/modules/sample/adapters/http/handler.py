"""sample モジュールの HTTP ハンドラー。

サンプルリソースの CRUD 的な HTTP エンドポイントの雛形を提供します。
実際のドメインに合わせて置き換えまたは拡張してください。

エラーハンドリング方針:
- ドメイン例外（ValidationError, NotFoundError など）はグローバル例外ハンドラーで処理
- ハンドラーでは例外をキャッチせず、そのまま投げる
- これにより、ハンドラーはリクエスト/レスポンス変換に集中できる
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

# =============================================================================
# TODO: 準備ができたらコマンド/クエリをアンコメントしてインポート
# =============================================================================
# from src.adapter.http.dependencies import (
#     CreateSampleCommandDep,
#     GetSampleQueryDep,
#     ListSamplesQueryDep,
# )
# from src.modules.sample.application import (
#     CreateSampleRequest,
#     ListSamplesRequest,
# )
# =============================================================================

router = APIRouter(prefix="/samples", tags=["samples"])


class CreateSampleRequestModel(BaseModel):
    """サンプル作成用の API リクエストモデル"""

    name: str
    description: str | None = None


class SampleResponseModel(BaseModel):
    """サンプル用の API レスポンスモデル"""

    id: str
    name: str
    description: str | None
    created_at: str
    updated_at: str


class CreateSampleResponseModel(BaseModel):
    """サンプル作成用の API レスポンスモデル

    エラーは例外として投げられるため、success フィールドは不要です。
    """

    id: str
    name: str
    created_at: str


class SampleItemModel(BaseModel):
    """サンプル一覧の 1 件用 API レスポンスモデル"""

    id: str
    name: str
    created_at: str


class ListSamplesResponseModel(BaseModel):
    """サンプル一覧用の API レスポンスモデル"""

    items: list[SampleItemModel]
    total: int
    limit: int
    offset: int


@router.get("/")
async def list_samples(
    limit: int = 10,
    offset: int = 0,
    # usecase: ListSamplesQueryDep,  # TODO: 準備ができたらアンコメント
) -> ListSamplesResponseModel:
    """ページネーション付きで全サンプルを一覧表示

    Args:
        limit: 返すアイテムの最大数
        offset: スキップするアイテム数
        usecase: サンプル一覧ユースケース

    Returns:
        ページネーションされたサンプル一覧
    """
    # TODO: リポジトリの準備ができたら実装
    # request = ListSamplesRequest(limit=limit, offset=offset)
    # response = await usecase.execute(request)
    # return ListSamplesResponseModel(
    #     items=[
    #         {"id": item.id, "name": item.name, "created_at": item.created_at.isoformat()}
    #         for item in response.items
    #     ],
    #     total=response.total,
    #     limit=response.limit,
    #     offset=response.offset,
    # )

    # プレースホルダーレスポンス
    return ListSamplesResponseModel(
        items=[],
        total=0,
        limit=limit,
        offset=offset,
    )


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_sample(
    request: CreateSampleRequestModel,
    # usecase: CreateSampleCommandDep,  # TODO: 準備ができたらアンコメント
) -> CreateSampleResponseModel:
    """新しいサンプルを作成

    Args:
        request: 作成リクエスト
        usecase: サンプル作成ユースケース

    Returns:
        作成されたサンプルレスポンス

    Raises:
        ValidationError: バリデーションエラー（400）
        ConflictError: 重複エラー（409）
        OperationError: 操作エラー（500）

    Note:
        例外はグローバル例外ハンドラーで処理され、
        適切な HTTP ステータスコードとエラーレスポンスに変換されます。
    """
    # TODO: リポジトリの準備ができたら実装
    # dto_request = CreateSampleRequest(
    #     name=request.name,
    #     description=request.description,
    # )
    #
    # # 例外はグローバル例外ハンドラーで処理される
    # # - SampleValidationError -> 400 Bad Request
    # # - DuplicateEntityError -> 409 Conflict
    # # - RepositoryOperationError -> 500 Internal Server Error
    # response = await usecase.execute(dto_request)
    #
    # return CreateSampleResponseModel(
    #     id=response.id,
    #     name=response.name,
    #     created_at=response.created_at.isoformat(),
    # )

    raise HTTPException(status_code=501, detail="まだ実装されていません")


@router.get("/{sample_id}")
async def get_sample(
    sample_id: str,
    # usecase: GetSampleQueryDep,  # TODO: 準備ができたらアンコメント
) -> SampleResponseModel:
    """ID でサンプルを取得

    Args:
        sample_id: サンプル ID
        usecase: サンプル取得ユースケース

    Returns:
        サンプル詳細

    Raises:
        NotFoundError: サンプルが見つからない場合（404）

    Note:
        例外はグローバル例外ハンドラーで処理され、
        適切な HTTP ステータスコードとエラーレスポンスに変換されます。
    """
    # TODO: リポジトリの準備ができたら実装
    # response = await usecase.execute(sample_id)
    #
    # return SampleResponseModel(
    #     id=response.id,
    #     name=response.name,
    #     description=response.description,
    #     created_at=response.created_at.isoformat(),
    #     updated_at=response.updated_at.isoformat(),
    # )

    raise HTTPException(status_code=501, detail="まだ実装されていません")


__all__ = ["router"]
