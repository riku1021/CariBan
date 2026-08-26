"""sample モジュールのドメイン層。

`modules.sample.domain` 配下に物理的に存在するドメインオブジェクトを
モジュール外に公開するためのエントリポイントです。
"""

from .entity import SampleEntity
from .errors import (
    DuplicateEntityError,
    EmptyValueError,
    RepositoryOperationError,
    SampleDomainError,
    SampleNotFoundError,
    SampleValidationError,
    ValueTooLongError,
)
from .events import SampleCreatedEvent, SampleDeletedEvent, SampleUpdatedEvent
from .repository import SampleRepository
from .service import SampleDomainService
from .vo import SampleValueObject

__all__ = [
    "SampleEntity",
    "SampleValueObject",
    "SampleCreatedEvent",
    "SampleUpdatedEvent",
    "SampleDeletedEvent",
    "SampleDomainError",
    "SampleValidationError",
    "EmptyValueError",
    "ValueTooLongError",
    "SampleNotFoundError",
    "RepositoryOperationError",
    "DuplicateEntityError",
    "SampleRepository",
    "SampleDomainService",
]
