"""user モジュールの値オブジェクト定義。"""

import re
from dataclasses import dataclass

from .errors import UserValidationError


@dataclass(frozen=True)
class Email:
    """メールアドレス値オブジェクト

    メールアドレスのバリデーションと正規化を行います。

    特性:
    - 不変（frozen=True）
    - 自己検証（__post_init__ で検証）
    - 小文字に正規化

    Attributes:
        value: メールアドレス文字列

    使用例:
        # コンストラクタを使用
        email = Email("User@Example.com")  # -> "user@example.com"

        # ファクトリーメソッドを使用
        email = Email.create("User@Example.com")
    """

    value: str

    # メールアドレスの正規表現パターン
    _EMAIL_PATTERN = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")

    def __post_init__(self) -> None:
        """初期化後にメールアドレスを検証

        Raises:
            UserValidationError: メールアドレスが無効な場合
        """
        # 空白を除去
        trimmed = self.value.strip()

        if not trimmed:
            raise UserValidationError("メールアドレスは必須です")

        if not self._EMAIL_PATTERN.match(trimmed):
            raise UserValidationError(f"無効なメールアドレス形式です: {trimmed}")

        # 最大長の検証
        if len(trimmed) > 254:
            raise UserValidationError("メールアドレスが長すぎます（最大254文字）")

        # 小文字に正規化
        object.__setattr__(self, "value", trimmed.lower())

    @classmethod
    def create(cls, value: str) -> "Email":
        """メールアドレスを作成するファクトリーメソッド

        コンストラクタと同じ動作ですが、より明示的な作成方法を提供します。

        Args:
            value: メールアドレス文字列

        Returns:
            Email インスタンス

        Raises:
            UserValidationError: メールアドレスが無効な場合
        """
        return cls(value)

    def __str__(self) -> str:
        """文字列表現を返す"""
        return self.value

    def __eq__(self, other: object) -> bool:
        """別の Email との等価性をチェック"""
        if not isinstance(other, Email):
            return False
        return self.value == other.value

    def get_domain(self) -> str:
        """メールアドレスのドメイン部分を取得

        Returns:
            ドメイン部分（例: "example.com"）
        """
        return self.value.split("@")[1]

    def get_local_part(self) -> str:
        """メールアドレスのローカル部分を取得

        Returns:
            ローカル部分（例: "user"）
        """
        return self.value.split("@")[0]


@dataclass(frozen=True)
class UserName:
    """ユーザー名値オブジェクト

    ユーザー名のバリデーションと正規化を行います。

    特性:
    - 不変（frozen=True）
    - 自己検証（__post_init__ で検証）
    - 3〜50文字の制限

    Attributes:
        first_name: 名
        last_name: 姓

    使用例:
        # コンストラクタを使用
        name = UserName(first_name="太郎", last_name="山田")

        # ファクトリーメソッドを使用
        name = UserName.create(first_name="太郎", last_name="山田")
    """

    first_name: str
    last_name: str

    # 名前の最小/最大長
    _MIN_LENGTH = 1
    _MAX_LENGTH = 50

    def __post_init__(self) -> None:
        """初期化後にユーザー名を検証

        Raises:
            UserValidationError: ユーザー名が無効な場合
        """
        # 空白を除去
        first = self.first_name.strip()
        last = self.last_name.strip()

        # 必須チェック
        if not first:
            raise UserValidationError("名は必須です")
        if not last:
            raise UserValidationError("姓は必須です")

        # 長さチェック
        if len(first) < self._MIN_LENGTH or len(first) > self._MAX_LENGTH:
            raise UserValidationError(
                f"名は{self._MIN_LENGTH}〜{self._MAX_LENGTH}文字である必要があります"
            )
        if len(last) < self._MIN_LENGTH or len(last) > self._MAX_LENGTH:
            raise UserValidationError(
                f"姓は{self._MIN_LENGTH}〜{self._MAX_LENGTH}文字である必要があります"
            )

        # 正規化された値を設定
        object.__setattr__(self, "first_name", first)
        object.__setattr__(self, "last_name", last)

    @classmethod
    def create(cls, first_name: str, last_name: str) -> "UserName":
        """ユーザー名を作成するファクトリーメソッド

        Args:
            first_name: 名
            last_name: 姓

        Returns:
            UserName インスタンス

        Raises:
            UserValidationError: ユーザー名が無効な場合
        """
        return cls(first_name=first_name, last_name=last_name)

    def __str__(self) -> str:
        """文字列表現を返す（姓 名）"""
        return f"{self.last_name} {self.first_name}"

    def __eq__(self, other: object) -> bool:
        """別の UserName との等価性をチェック"""
        if not isinstance(other, UserName):
            return False
        return self.first_name == other.first_name and self.last_name == other.last_name

    @property
    def full_name(self) -> str:
        """フルネームを取得（姓 名）"""
        return f"{self.last_name} {self.first_name}"

    @property
    def full_name_western(self) -> str:
        """西洋式フルネームを取得（名 姓）"""
        return f"{self.first_name} {self.last_name}"

    @property
    def initials(self) -> str:
        """イニシャルを取得

        Returns:
            イニシャル（例: "Y.T."）
        """
        return f"{self.last_name[0]}.{self.first_name[0]}."
