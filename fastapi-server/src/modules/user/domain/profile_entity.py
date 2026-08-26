"""user モジュールのユーザープロファイルエンティティ定義。"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import TypedDict

from .errors import UserValidationError


class UserProfileDict(TypedDict):
    """UserProfile を辞書化したときの型（to_dict の戻り値）"""

    bio: str | None
    avatar_url: str | None
    website: str | None
    location: str | None
    created_at: str
    updated_at: str


@dataclass
class UserProfile:
    """ユーザープロファイルエンティティ（集約内エンティティ）

    User 集約内のエンティティとして、ユーザーの追加情報を管理します。

    整合性ルール:
    - bio は最大500文字
    - avatar_url は有効なURLである必要がある（オプション）

    Attributes:
        bio: 自己紹介文（オプション）
        avatar_url: アバター画像のURL（オプション）
        website: ウェブサイトURL（オプション）
        location: 所在地（オプション）
        created_at: 作成日時
        updated_at: 最終更新日時
    """

    bio: str | None = None
    avatar_url: str | None = None
    website: str | None = None
    location: str | None = None
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)

    # 制限値
    _MAX_BIO_LENGTH = 500
    _MAX_LOCATION_LENGTH = 100

    def __post_init__(self) -> None:
        """初期化後にプロファイルを検証

        Raises:
            UserValidationError: 検証に失敗した場合
        """
        self._validate()

    def _validate(self) -> None:
        """プロファイルを検証

        Raises:
            UserValidationError: 検証に失敗した場合
        """
        # bio の長さチェック
        if self.bio and len(self.bio) > self._MAX_BIO_LENGTH:
            raise UserValidationError(
                f"自己紹介は{self._MAX_BIO_LENGTH}文字以下である必要があります"
            )

        # location の長さチェック
        if self.location and len(self.location) > self._MAX_LOCATION_LENGTH:
            raise UserValidationError(
                f"所在地は{self._MAX_LOCATION_LENGTH}文字以下である必要があります"
            )

        # avatar_url のフォーマットチェック（簡易）
        if self.avatar_url and not (
            self.avatar_url.startswith("http://") or self.avatar_url.startswith("https://")
        ):
            raise UserValidationError("アバターURLは有効なURLである必要があります")

        # website のフォーマットチェック（簡易）
        if self.website and not (
            self.website.startswith("http://") or self.website.startswith("https://")
        ):
            raise UserValidationError("ウェブサイトURLは有効なURLである必要があります")

    def update(
        self,
        bio: str | None = None,
        avatar_url: str | None = None,
        website: str | None = None,
        location: str | None = None,
    ) -> None:
        """プロファイルを更新

        注意: このメソッドは User（Aggregate Root）を通じて呼び出されます。
        直接呼び出さないでください。

        Args:
            bio: 新しい自己紹介文（None の場合は変更なし）
            avatar_url: 新しいアバターURL（None の場合は変更なし）
            website: 新しいウェブサイトURL（None の場合は変更なし）
            location: 新しい所在地（None の場合は変更なし）

        Raises:
            UserValidationError: 検証に失敗した場合
        """
        if bio is not None:
            self.bio = bio
        if avatar_url is not None:
            self.avatar_url = avatar_url if avatar_url else None
        if website is not None:
            self.website = website if website else None
        if location is not None:
            self.location = location if location else None

        # 検証
        self._validate()

        # 更新日時を更新
        self.updated_at = datetime.now()

    @classmethod
    def create_empty(cls) -> "UserProfile":
        """空のプロファイルを作成

        新しいユーザー作成時に使用します。

        Returns:
            空の UserProfile インスタンス
        """
        return cls()

    def is_complete(self) -> bool:
        """プロファイルが完全かどうかを確認

        bio と location が設定されている場合、完全とみなします。

        Returns:
            プロファイルが完全であれば True
        """
        return bool(self.bio) and bool(self.location)

    def to_dict(self) -> UserProfileDict:
        """辞書形式に変換

        Returns:
            プロファイル情報の辞書
        """
        return {
            "bio": self.bio,
            "avatar_url": self.avatar_url,
            "website": self.website,
            "location": self.location,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
