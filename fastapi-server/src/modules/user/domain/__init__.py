"""user モジュールのドメイン層。

`modules.user.domain` 配下に物理的に存在するドメインオブジェクトを
モジュール外に公開するためのエントリポイントです。
"""

from .entity import User, UserStatus
from .errors import (
    DuplicateEmailError,
    UserDeactivatedError,
    UserDomainError,
    UserNotFoundError,
    UserProfileNotFoundError,
    UserValidationError,
)
from .events import (
    UserActivatedEvent,
    UserCreatedEvent,
    UserDeactivatedEvent,
    UserEmailChangedEvent,
    UserProfileUpdatedEvent,
)
from .profile_entity import UserProfile
from .repository import UserRepository
from .service import UserDomainService
from .specifications import (
    ActiveUserSpecification,
    EmailDomainSpecification,
    HasCompleteProfileSpecification,
    HasProfileSpecification,
    InactiveUserSpecification,
    NameContainsSpecification,
    SuspendedUserSpecification,
)
from .vo import Email, UserName

__all__ = [
    "User",
    "UserStatus",
    "UserProfile",
    "Email",
    "UserName",
    "UserDomainService",
    "UserRepository",
    "UserDomainError",
    "UserValidationError",
    "UserNotFoundError",
    "UserProfileNotFoundError",
    "DuplicateEmailError",
    "UserDeactivatedError",
    "UserCreatedEvent",
    "UserProfileUpdatedEvent",
    "UserDeactivatedEvent",
    "UserEmailChangedEvent",
    "UserActivatedEvent",
    "ActiveUserSpecification",
    "InactiveUserSpecification",
    "SuspendedUserSpecification",
    "HasProfileSpecification",
    "HasCompleteProfileSpecification",
    "EmailDomainSpecification",
    "NameContainsSpecification",
]
