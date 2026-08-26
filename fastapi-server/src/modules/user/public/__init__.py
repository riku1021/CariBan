"""user モジュールの公開 API。

他モジュールやアプリケーション最外層から user コンテキストにアクセスするための
ファサードとして機能します。

他モジュールからは、`src.modules.user.public` だけを import することを推奨します。
`domain` / `application` / `infrastructure` / `adapters` への直接依存は避けてください。
"""

from src.modules.user.application import (
    CreateUserCommand,
    CreateUserRequest,
    CreateUserResponse,
    GetUserQuery,
    GetUserResponse,
    ListUsersRequest,
    ListUsersResponse,
    UpdateUserProfileCommand,
    UpdateUserProfileRequest,
    UpdateUserProfileResponse,
    UserItem,
    UserProfileResponse,
)
from src.modules.user.domain import (
    Email,
    User,
    UserDomainService,
    UserName,
    UserProfile,
    UserRepository,
    UserStatus,
)

__all__ = [
    "User",
    "UserStatus",
    "UserProfile",
    "Email",
    "UserName",
    "UserRepository",
    "UserDomainService",
    "CreateUserRequest",
    "CreateUserResponse",
    "UpdateUserProfileRequest",
    "UpdateUserProfileResponse",
    "GetUserResponse",
    "ListUsersRequest",
    "ListUsersResponse",
    "UserItem",
    "UserProfileResponse",
    "CreateUserCommand",
    "UpdateUserProfileCommand",
    "GetUserQuery",
]
