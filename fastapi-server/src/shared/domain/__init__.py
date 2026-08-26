"""共有ドメイン基盤コンポーネント。

複数モジュールで共通利用される AggregateRoot / DomainEvent / Specification /
共通ドメインエラーなどをここで集約します。

`src.shared.domain` は Core ドメイン基盤の唯一の正規の参照先として扱います。
"""

from .aggregate_root import AggregateRoot
from .errors import (
    ConflictError,
    DomainError,
    ForbiddenError,
    NotFoundError,
    OperationError,
    UnauthorizedError,
    ValidationError,
)
from .events import DomainEvent
from .specification import (
    AndSpecification,
    NotSpecification,
    OrSpecification,
    Specification,
)

__all__ = [
    "AggregateRoot",
    "DomainError",
    "ValidationError",
    "NotFoundError",
    "ConflictError",
    "OperationError",
    "UnauthorizedError",
    "ForbiddenError",
    "DomainEvent",
    "Specification",
    "AndSpecification",
    "OrSpecification",
    "NotSpecification",
]
