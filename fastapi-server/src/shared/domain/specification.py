"""Specification パターン（共有版）

Specification パターンは、ビジネスルールをオブジェクトとしてカプセル化します。
複雑な検索条件や検証ロジックを再利用可能な形で表現できます。

使用例:
    # 単一の Specification
    spec = ActiveUserSpecification()
    if spec.is_satisfied_by(user):
        print("アクティブユーザーです")

    # 複合 Specification
    spec = ActiveUserSpecification() & HasProfileSpecification()
    matching_users = [u for u in users if spec.is_satisfied_by(u)]

    # リポジトリでの使用
    users = await repository.find_by_specification(spec)
"""

from abc import ABC, abstractmethod
from typing import Generic, TypeVar

T = TypeVar("T")


class Specification(ABC, Generic[T]):  # noqa: UP046
    """Specification 基底クラス

    ビジネスルールをオブジェクトとしてカプセル化します。

    特徴:
    - 再利用可能なビジネスルール
    - 複合 Specification（AND, OR, NOT）をサポート
    - 可読性の高いコード

    使用例:
        class ActiveUserSpecification(Specification[User]):
            def is_satisfied_by(self, candidate: User) -> bool:
                return candidate.is_active()

        # 使用
        spec = ActiveUserSpecification()
        if spec.is_satisfied_by(user):
            # ユーザーはアクティブ
            pass
    """

    @abstractmethod
    def is_satisfied_by(self, candidate: T) -> bool:
        """候補がこの Specification を満たすかどうかを判定

        Args:
            candidate: 判定対象

        Returns:
            Specification を満たす場合は True
        """
        raise NotImplementedError

    def __and__(self, other: "Specification[T]") -> "AndSpecification[T]":
        """AND 演算子

        使用例:
            spec = ActiveUserSpecification() & HasProfileSpecification()
        """
        return AndSpecification(self, other)

    def __or__(self, other: "Specification[T]") -> "OrSpecification[T]":
        """OR 演算子

        使用例:
            spec = ActiveUserSpecification() | AdminUserSpecification()
        """
        return OrSpecification(self, other)

    def __invert__(self) -> "NotSpecification[T]":
        """NOT 演算子

        使用例:
            spec = ~ActiveUserSpecification()  # 非アクティブユーザー
        """
        return NotSpecification(self)


class AndSpecification(Specification[T]):
    """AND 複合 Specification

    両方の Specification を満たす場合に True を返します。
    """

    def __init__(
        self,
        left: Specification[T],
        right: Specification[T],
    ) -> None:
        self._left = left
        self._right = right

    def is_satisfied_by(self, candidate: T) -> bool:
        return self._left.is_satisfied_by(candidate) and self._right.is_satisfied_by(candidate)


class OrSpecification(Specification[T]):
    """OR 複合 Specification

    いずれかの Specification を満たす場合に True を返します。
    """

    def __init__(
        self,
        left: Specification[T],
        right: Specification[T],
    ) -> None:
        self._left = left
        self._right = right

    def is_satisfied_by(self, candidate: T) -> bool:
        return self._left.is_satisfied_by(candidate) or self._right.is_satisfied_by(candidate)


class NotSpecification(Specification[T]):
    """NOT Specification

    元の Specification を満たさない場合に True を返します。
    """

    def __init__(self, spec: Specification[T]) -> None:
        self._spec = spec

    def is_satisfied_by(self, candidate: T) -> bool:
        return not self._spec.is_satisfied_by(candidate)


__all__ = [
    "Specification",
    "AndSpecification",
    "OrSpecification",
    "NotSpecification",
]
