"""sample モジュールの値オブジェクト定義。"""

from dataclasses import dataclass

from .errors import SampleValidationError


@dataclass(frozen=True)
class SampleValueObject:
    """サンプル値オブジェクト - 実際の値オブジェクトに置き換えてください

    値オブジェクトは以下の特性を持つべきです:
    - 不変（frozen=True）
    - 自己検証（__post_init__ で検証）
    - 値による比較（__eq__）

    Attributes:
        value: 実際の値
    """

    value: str

    def __post_init__(self) -> None:
        """初期化後に値オブジェクトを検証

        Raises:
            SampleValidationError: 検証に失敗した場合
        """
        trimmed = self.value.strip()
        if len(trimmed) == 0:
            raise SampleValidationError("値は空にできません")

        # TODO: ここにバリデーションルールを追加してください
        # 例: 最大長の検証
        # if len(trimmed) > 200:
        #     raise SampleValidationError("値が長すぎます（最大200文字）")

        # トリムされた値で更新
        object.__setattr__(self, "value", trimmed)

    def __str__(self) -> str:
        """文字列表現を返す"""
        return self.value

    def is_empty(self) -> bool:
        """値が空かどうかをチェック"""
        return len(self.value.strip()) == 0

    def __eq__(self, other: object) -> bool:
        """別の値オブジェクトとの等価性をチェック"""
        if not isinstance(other, SampleValueObject):
            return False
        return self.value == other.value
