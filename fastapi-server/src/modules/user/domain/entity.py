"""user モジュールのユーザーエンティティ定義。"""

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum

from src.shared.domain import AggregateRoot, DomainEvent

from .errors import UserProfileNotFoundError, UserValidationError
from .events import (
    UserCreatedEvent,
    UserDeactivatedEvent,
    UserEmailChangedEvent,
    UserProfileUpdatedEvent,
)
from .profile_entity import UserProfile
from .vo import Email, UserName


class UserStatus(Enum):
    """ユーザーステータス"""

    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"


@dataclass
class User(AggregateRoot):
    """ユーザーエンティティ（Aggregate Root）

    複数のエンティティを含む集約の例として、User と UserProfile の
    関係を示します。

    集約の整合性ルール:
    - Email は一意でなければならない
    - UserProfile は User なしでは存在できない
    - ステータスが ACTIVE でないユーザーは操作できない

    Attributes:
        id: ユーザーID（一意識別子）
        email: メールアドレス（値オブジェクト）
        name: ユーザー名（値オブジェクト）
        status: ユーザーステータス
        profile: ユーザープロファイル（集約内エンティティ）
        created_at: 作成日時
        updated_at: 最終更新日時
        _domain_events: ドメインイベントのリスト
    """

    email: Email = field(default_factory=lambda: Email("placeholder@example.com"))
    name: UserName = field(default_factory=lambda: UserName(first_name="Unknown", last_name="User"))
    status: UserStatus = UserStatus.ACTIVE
    profile: UserProfile | None = None
    _domain_events: list[DomainEvent] = field(default_factory=list, repr=False)

    def __post_init__(self) -> None:
        """初期化後にエンティティを検証"""
        # email と name は値オブジェクトなので、既に検証済み
        pass

    # =========================================================================
    # ファクトリーメソッド
    # =========================================================================

    @classmethod
    def create(
        cls,
        email: Email,
        name: UserName,
        bio: str | None = None,
    ) -> "User":
        """新しいユーザーを作成

        ファクトリーメソッドとして、複雑な作成ロジックをカプセル化します。
        ユーザーと一緒に空のプロファイルも作成します。

        Args:
            email: メールアドレス
            name: ユーザー名
            bio: 自己紹介文（オプション）

        Returns:
            新しい User インスタンス

        Raises:
            UserValidationError: 検証に失敗した場合
        """
        # プロファイルを作成
        profile = UserProfile(bio=bio) if bio else UserProfile.create_empty()

        user = cls(
            email=email,
            name=name,
            status=UserStatus.ACTIVE,
            profile=profile,
        )

        # ドメインイベントを発行
        user.add_domain_event(
            UserCreatedEvent(
                user_id="",  # 永続化後に設定
                email=str(email),
                full_name=str(name),
            )
        )

        return user

    @classmethod
    def create_with_profile(
        cls,
        email: Email,
        name: UserName,
        profile: UserProfile,
    ) -> "User":
        """プロファイル付きでユーザーを作成

        既存のプロファイルを持つユーザーを作成します。

        Args:
            email: メールアドレス
            name: ユーザー名
            profile: ユーザープロファイル

        Returns:
            新しい User インスタンス
        """
        user = cls(
            email=email,
            name=name,
            status=UserStatus.ACTIVE,
            profile=profile,
        )

        # ドメインイベントを発行
        user.add_domain_event(
            UserCreatedEvent(
                user_id="",
                email=str(email),
                full_name=str(name),
            )
        )

        return user

    @classmethod
    def reconstruct(
        cls,
        id: str,
        email: Email,
        name: UserName,
        status: UserStatus,
        profile: UserProfile | None,
        created_at: datetime,
        updated_at: datetime,
    ) -> "User":
        """永続化データからユーザーを再構築

        リポジトリからデータを復元する際に使用します。
        再構築時にはドメインイベントは発行しません。

        Args:
            id: ユーザーID
            email: メールアドレス
            name: ユーザー名
            status: ユーザーステータス
            profile: ユーザープロファイル
            created_at: 作成日時
            updated_at: 更新日時

        Returns:
            再構築された User インスタンス
        """
        user = cls(
            id=id,
            email=email,
            name=name,
            status=status,
            profile=profile,
            created_at=created_at,
            updated_at=updated_at,
        )
        # 再構築時はイベントをクリア
        user.clear_domain_events()
        return user

    # =========================================================================
    # ビジネスメソッド - 集約の整合性を保証
    # =========================================================================

    def update_profile(
        self,
        bio: str | None = None,
        avatar_url: str | None = None,
        website: str | None = None,
        location: str | None = None,
    ) -> None:
        """プロファイルを更新

        Aggregate Root を通じてプロファイルを更新します。
        これにより、集約の整合性が保証されます。

        Args:
            bio: 自己紹介文
            avatar_url: アバターURL
            website: ウェブサイトURL
            location: 所在地

        Raises:
            UserValidationError: ユーザーがアクティブでない場合
            UserProfileNotFoundError: プロファイルが存在しない場合
        """
        self._ensure_active()

        if self.profile is None:
            raise UserProfileNotFoundError(self.id)

        # プロファイルを更新（集約内エンティティのメソッドを呼び出し）
        self.profile.update(
            bio=bio,
            avatar_url=avatar_url,
            website=website,
            location=location,
        )

        self.touch()

        # ドメインイベントを発行
        self.add_domain_event(
            UserProfileUpdatedEvent(
                user_id=self.id,
                bio=bio,
                avatar_url=avatar_url,
                updated_at=self.updated_at,
            )
        )

    def change_email(self, new_email: Email) -> None:
        """メールアドレスを変更

        注意: メールアドレスの一意性はドメインサービスで確認する必要があります。

        Args:
            new_email: 新しいメールアドレス

        Raises:
            UserValidationError: ユーザーがアクティブでない場合
        """
        self._ensure_active()

        old_email = str(self.email)
        self.email = new_email
        self.touch()

        # ドメインイベントを発行
        self.add_domain_event(
            UserEmailChangedEvent(
                user_id=self.id,
                old_email=old_email,
                new_email=str(new_email),
                changed_at=self.updated_at,
            )
        )

    def change_name(self, new_name: UserName) -> None:
        """名前を変更

        Args:
            new_name: 新しい名前

        Raises:
            UserValidationError: ユーザーがアクティブでない場合
        """
        self._ensure_active()

        self.name = new_name
        self.touch()

    def deactivate(self, reason: str | None = None) -> None:
        """ユーザーを非アクティブ化

        Args:
            reason: 非アクティブ化の理由（オプション）
        """
        self.status = UserStatus.INACTIVE
        self.touch()

        # ドメインイベントを発行
        self.add_domain_event(
            UserDeactivatedEvent(
                user_id=self.id,
                reason=reason,
                deactivated_at=self.updated_at,
            )
        )

    def activate(self) -> None:
        """ユーザーをアクティブ化"""
        self.status = UserStatus.ACTIVE
        self.touch()

    def suspend(self, reason: str | None = None) -> None:  # noqa: ARG002
        """ユーザーを一時停止

        Args:
            reason: 一時停止の理由（オプション、将来のイベント用）
        """
        self.status = UserStatus.SUSPENDED
        self.touch()

    # =========================================================================
    # ヘルパーメソッド
    # =========================================================================

    def _ensure_active(self) -> None:
        """ユーザーがアクティブであることを確認

        Raises:
            UserValidationError: ユーザーがアクティブでない場合
        """
        if self.status != UserStatus.ACTIVE:
            raise UserValidationError(
                f"ユーザーはアクティブではありません（ステータス: {self.status.value}）"
            )

    def is_active(self) -> bool:
        """ユーザーがアクティブかどうかを確認

        Returns:
            アクティブであれば True
        """
        return self.status == UserStatus.ACTIVE

    def has_profile(self) -> bool:
        """プロファイルが存在するかどうかを確認

        Returns:
            プロファイルが存在すれば True
        """
        return self.profile is not None

    def get_profile_or_raise(self) -> UserProfile:
        """プロファイルを取得（存在しない場合は例外）

        Returns:
            UserProfile

        Raises:
            UserProfileNotFoundError: プロファイルが存在しない場合
        """
        if self.profile is None:
            raise UserProfileNotFoundError(self.id)
        return self.profile
