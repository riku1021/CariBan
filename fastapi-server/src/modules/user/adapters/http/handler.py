"""user モジュールの HTTP ハンドラー。

ユーザードメインの HTTP エンドポイントを提供します。

エラーハンドリング方針:
- ドメイン例外はグローバル例外ハンドラーで処理
- ハンドラーでは例外をキャッチせず、そのまま投げる
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

# =============================================================================
# TODO: 依存性注入の設定後に以下をアンコメント
# =============================================================================
# from src.adapter.http.dependencies import (
#     CreateUserCommandDep,
#     GetUserQueryDep,
#     UpdateUserProfileCommandDep,
# )
# from src.modules.user.application import (
#     CreateUserRequest,
#     UpdateUserProfileRequest,
# )
# =============================================================================

router = APIRouter(prefix="/users", tags=["users"])


class CreateUserRequestModel(BaseModel):
    """ユーザー作成用の API リクエストモデル"""

    email: str
    first_name: str
    last_name: str
    bio: str | None = None


class CreateUserResponseModel(BaseModel):
    """ユーザー作成用の API レスポンスモデル"""

    id: str
    email: str
    full_name: str
    created_at: str


class UpdateUserProfileRequestModel(BaseModel):
    """ユーザープロファイル更新用の API リクエストモデル"""

    bio: str | None = None
    avatar_url: str | None = None
    website: str | None = None
    location: str | None = None


class UpdateUserProfileResponseModel(BaseModel):
    """ユーザープロファイル更新用の API レスポンスモデル"""

    user_id: str
    updated_at: str


class UserProfileResponseModel(BaseModel):
    """ユーザープロファイル用の API レスポンスモデル"""

    bio: str | None
    avatar_url: str | None
    website: str | None
    location: str | None


class UserResponseModel(BaseModel):
    """ユーザー詳細用の API レスポンスモデル"""

    id: str
    email: str
    first_name: str
    last_name: str
    full_name: str
    status: str
    profile: UserProfileResponseModel | None
    created_at: str
    updated_at: str


class UserItemModel(BaseModel):
    """ユーザー一覧の 1 件用 API レスポンスモデル"""

    id: str
    email: str
    full_name: str
    status: str
    created_at: str


class ListUsersResponseModel(BaseModel):
    """ユーザー一覧用の API レスポンスモデル"""

    items: list[UserItemModel]
    total: int
    limit: int
    offset: int


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(
    request: CreateUserRequestModel,
    # command: CreateUserCommandDep,  # TODO: 依存性注入設定後にアンコメント
) -> CreateUserResponseModel:
    """新しいユーザーを作成

    Args:
        request: 作成リクエスト
        command: ユーザー作成コマンド

    Returns:
        作成されたユーザーレスポンス

    Raises:
        UserValidationError: バリデーションエラー（400）
        DuplicateEmailError: メールアドレス重複エラー（409）
    """
    # TODO: 依存性注入設定後に実装
    # dto_request = CreateUserRequest(
    #     email=request.email,
    #     first_name=request.first_name,
    #     last_name=request.last_name,
    #     bio=request.bio,
    # )
    #
    # response = await command.execute(dto_request)
    #
    # return CreateUserResponseModel(
    #     id=response.id,
    #     email=response.email,
    #     full_name=response.full_name,
    #     created_at=response.created_at.isoformat(),
    # )

    raise HTTPException(status_code=501, detail="まだ実装されていません")


@router.get("/{user_id}")
async def get_user(
    user_id: str,
    # query: GetUserQueryDep,  # TODO: 依存性注入設定後にアンコメント
) -> UserResponseModel:
    """ID でユーザーを取得

    Args:
        user_id: ユーザー ID
        query: ユーザー取得クエリ

    Returns:
        ユーザー詳細

    Raises:
        UserNotFoundError: ユーザーが見つからない場合（404）
    """
    # TODO: 依存性注入設定後に実装
    # response = await query.execute(user_id)
    #
    # profile_model = None
    # if response.profile:
    #     profile_model = UserProfileResponseModel(
    #         bio=response.profile.bio,
    #         avatar_url=response.profile.avatar_url,
    #         website=response.profile.website,
    #         location=response.profile.location,
    #     )
    #
    # return UserResponseModel(
    #     id=response.id,
    #     email=response.email,
    #     first_name=response.first_name,
    #     last_name=response.last_name,
    #     full_name=response.full_name,
    #     status=response.status,
    #     profile=profile_model,
    #     created_at=response.created_at.isoformat(),
    #     updated_at=response.updated_at.isoformat(),
    # )

    raise HTTPException(status_code=501, detail="まだ実装されていません")


@router.put("/{user_id}/profile")
async def update_user_profile(
    user_id: str,
    request: UpdateUserProfileRequestModel,
    # command: UpdateUserProfileCommandDep,  # TODO: 依存性注入設定後にアンコメント
) -> UpdateUserProfileResponseModel:
    """ユーザープロファイルを更新

    Args:
        user_id: ユーザー ID
        request: 更新リクエスト
        command: プロファイル更新コマンド

    Returns:
        更新結果

    Raises:
        UserNotFoundError: ユーザーが見つからない場合（404）
        UserProfileNotFoundError: プロファイルが見つからない場合（404）
        UserValidationError: バリデーションエラー（400）
    """
    # TODO: 依存性注入設定後に実装
    # dto_request = UpdateUserProfileRequest(
    #     user_id=user_id,
    #     bio=request.bio,
    #     avatar_url=request.avatar_url,
    #     website=request.website,
    #     location=request.location,
    # )
    #
    # response = await command.execute(dto_request)
    #
    # return UpdateUserProfileResponseModel(
    #     user_id=response.user_id,
    #     updated_at=response.updated_at.isoformat(),
    # )

    raise HTTPException(status_code=501, detail="まだ実装されていません")


@router.get("/")
async def list_users(
    limit: int = 10,
    offset: int = 0,
) -> ListUsersResponseModel:
    """ページネーション付きで全ユーザーを一覧表示

    Args:
        limit: 返すアイテムの最大数
        offset: スキップするアイテム数

    Returns:
        ページネーションされたユーザー一覧
    """
    # TODO: 依存性注入設定後に実装
    return ListUsersResponseModel(
        items=[],
        total=0,
        limit=limit,
        offset=offset,
    )


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deactivate_user(
    user_id: str,
) -> None:
    """ユーザーを非アクティブ化

    Args:
        user_id: ユーザー ID

    Raises:
        UserNotFoundError: ユーザーが見つからない場合（404）
    """
    # TODO: 依存性注入設定後に実装
    raise HTTPException(status_code=501, detail="まだ実装されていません")


__all__ = ["router"]
