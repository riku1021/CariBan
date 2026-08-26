"""sample モジュールのドメインイベント定義。"""

from dataclasses import dataclass, field
from datetime import datetime

from src.shared.domain import DomainEvent


@dataclass
class SampleCreatedEvent(DomainEvent):
    """サンプル作成イベント

    新しいサンプルエンティティが作成されたときに発行されます。

    Attributes:
        sample_id: 作成されたサンプルのID
        name: サンプルの名前
    """

    sample_id: str = ""
    name: str = ""


@dataclass
class SampleUpdatedEvent(DomainEvent):
    """サンプル更新イベント

    サンプルエンティティが更新されたときに発行されます。

    Attributes:
        sample_id: 更新されたサンプルのID
        name: 更新後の名前
        updated_at: 更新日時
    """

    sample_id: str = ""
    name: str = ""
    updated_at: datetime = field(default_factory=datetime.now)


@dataclass
class SampleDeletedEvent(DomainEvent):
    """サンプル削除イベント

    サンプルエンティティが削除されたときに発行されます。

    Attributes:
        sample_id: 削除されたサンプルのID
    """

    sample_id: str = ""
