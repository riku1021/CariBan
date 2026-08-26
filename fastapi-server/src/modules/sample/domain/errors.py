"""sample モジュールのドメインエラー定義。"""

from src.shared.domain import (
    ConflictError,
    NotFoundError,
    OperationError,
    ValidationError,
)


class SampleDomainError(ValidationError):
    """サンプルドメインエラーの基底例外

    すべてのサンプルドメイン固有のエラーはこのクラスを継承する必要があります。
    """

    def __init__(self, message: str = "サンプルドメインエラー") -> None:
        super().__init__(message, error_code="SAMPLE_DOMAIN_ERROR")


# =============================================================================
# バリデーションエラー - 入力が要件を満たさない場合に発生
# =============================================================================


class SampleValidationError(ValidationError):
    """検証に失敗した場合に発生

    一般的な検証エラーに使用します。
    """

    def __init__(self, message: str = "検証に失敗しました") -> None:
        super().__init__(message, error_code="SAMPLE_VALIDATION_ERROR")


class EmptyValueError(ValidationError):
    """必須の値が空の場合に発生"""

    def __init__(self, field_name: str = "値") -> None:
        super().__init__(f"{field_name}は空にできません", error_code="EMPTY_VALUE")


class ValueTooLongError(ValidationError):
    """値が最大長を超えた場合に発生"""

    def __init__(self, field_name: str = "値", max_length: int = 200) -> None:
        super().__init__(
            f"{field_name}が長すぎます（最大{max_length}文字）",
            error_code="VALUE_TOO_LONG",
        )


# =============================================================================
# NotFound エラー - エンティティが見つからない場合に発生
# =============================================================================


class SampleNotFoundError(NotFoundError):
    """サンプルエンティティが見つからない場合に発生"""

    def __init__(self, entity_id: str = "") -> None:
        message = (
            f"サンプルエンティティが見つかりません: {entity_id}"
            if entity_id
            else "サンプルエンティティが見つかりません"
        )
        super().__init__(message, error_code="SAMPLE_NOT_FOUND")


# =============================================================================
# 操作エラー - 操作が失敗した場合に発生
# =============================================================================


class RepositoryOperationError(OperationError):
    """リポジトリ操作が失敗した場合に発生

    データベースや外部サービスのエラーに使用します。
    """

    def __init__(self, message: str) -> None:
        super().__init__(
            f"リポジトリ操作に失敗しました: {message}",
            error_code="REPOSITORY_OPERATION_ERROR",
        )


class DuplicateEntityError(ConflictError):
    """重複するエンティティを作成しようとした場合に発生"""

    def __init__(self, entity_id: str = "") -> None:
        message = (
            f"エンティティは既に存在します: {entity_id}"
            if entity_id
            else "エンティティは既に存在します"
        )
        super().__init__(message, error_code="DUPLICATE_ENTITY")
