"""user モジュールのドメインイベント定義。"""

from dataclasses import dataclass, field
from datetime import datetime

from src.shared.domain import DomainEvent


@dataclass
class UserCreatedEvent(DomainEvent):
    """ユーザー作成イベント

    新しいユーザーが作成されたときに発行されます。

    Attributes:
        user_id: 作成されたユーザーのID
        email: ユーザーのメールアドレス
        full_name: ユーザーのフルネーム
    """

    user_id: str = ""
    email: str = ""
    full_name: str = ""


@dataclass
class UserProfileUpdatedEvent(DomainEvent):
    """ユーザープロファイル更新イベント

    ユーザーのプロファイルが更新されたときに発行されます。

    Attributes:
        user_id: ユーザーのID
        bio: 更新後の自己紹介
        avatar_url: 更新後のアバターURL
        updated_at: 更新日時
    """

    user_id: str = ""
    bio: str | None = None
    avatar_url: str | None = None
    updated_at: datetime = field(default_factory=datetime.now)


@dataclass
class UserDeactivatedEvent(DomainEvent):
    """ユーザー非アクティブ化イベント

    ユーザーが非アクティブ化されたときに発行されます。

    Attributes:
        user_id: 非アクティブ化されたユーザーのID
        reason: 非アクティブ化の理由（オプション）
        deactivated_at: 非アクティブ化日時
    """

    user_id: str = ""
    reason: str | None = None
    deactivated_at: datetime = field(default_factory=datetime.now)


@dataclass
class UserEmailChangedEvent(DomainEvent):
    """ユーザーメールアドレス変更イベント

    ユーザーのメールアドレスが変更されたときに発行されます。

    Attributes:
        user_id: ユーザーのID
        old_email: 変更前のメールアドレス
        new_email: 変更後のメールアドレス
        changed_at: 変更日時
    """

    user_id: str = ""
    old_email: str = ""
    new_email: str = ""
    changed_at: datetime = field(default_factory=datetime.now)


@dataclass
class UserActivatedEvent(DomainEvent):
    """ユーザーアクティブ化イベント

    ユーザーが再アクティブ化されたときに発行されます。

    Attributes:
        user_id: アクティブ化されたユーザーのID
        activated_at: アクティブ化日時
    """

    user_id: str = ""
    activated_at: datetime = field(default_factory=datetime.now)
