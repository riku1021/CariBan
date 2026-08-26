"""user モジュールのユースケース DTO 定義。"""

from dataclasses import dataclass
from datetime import datetime

# =============================================================================
# コマンド（書き込み操作）DTO
# =============================================================================


@dataclass
class CreateUserRequest:
    """ユーザー作成リクエスト DTO"""

    email: str
    first_name: str
    last_name: str
    bio: str | None = None


@dataclass
class CreateUserResponse:
    """ユーザー作成レスポンス DTO"""

    id: str
    email: str
    full_name: str
    created_at: datetime


@dataclass
class UpdateUserProfileRequest:
    """ユーザープロファイル更新リクエスト DTO"""

    user_id: str
    bio: str | None = None
    avatar_url: str | None = None
    website: str | None = None
    location: str | None = None


@dataclass
class UpdateUserProfileResponse:
    """ユーザープロファイル更新レスポンス DTO"""

    user_id: str
    updated_at: datetime


# =============================================================================
# クエリ（読み取り操作）DTO
# =============================================================================


@dataclass
class UserProfileResponse:
    """ユーザープロファイルレスポンス DTO"""

    bio: str | None
    avatar_url: str | None
    website: str | None
    location: str | None


@dataclass
class GetUserResponse:
    """ユーザー詳細レスポンス DTO"""

    id: str
    email: str
    first_name: str
    last_name: str
    full_name: str
    status: str
    profile: UserProfileResponse | None
    created_at: datetime
    updated_at: datetime


@dataclass
class ListUsersRequest:
    """ユーザー一覧リクエスト DTO"""

    limit: int = 10
    offset: int = 0


@dataclass
class UserItem:
    """一覧レスポンス用のユーザーアイテム DTO"""

    id: str
    email: str
    full_name: str
    status: str
    created_at: datetime


@dataclass
class ListUsersResponse:
    """ユーザー一覧レスポンス DTO"""

    items: list[UserItem]
    total: int
    limit: int
    offset: int
