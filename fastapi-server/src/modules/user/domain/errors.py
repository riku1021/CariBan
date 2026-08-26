"""user モジュールのドメインエラー定義。"""

from src.shared.domain import ConflictError, NotFoundError, ValidationError


class UserDomainError(Exception):
    """ユーザードメインエラーの基底クラス"""

    def __init__(self, message: str, error_code: str = "USER_DOMAIN_ERROR") -> None:
        self.message = message
        self.error_code = error_code
        super().__init__(message)


class UserValidationError(ValidationError):
    """ユーザーバリデーションエラー

    ユーザーまたはプロファイルのバリデーションに失敗した場合に発生します。

    使用例:
        raise UserValidationError("無効なメールアドレス形式です")
    """

    def __init__(self, message: str) -> None:
        super().__init__(message, error_code="USER_VALIDATION_ERROR")


class UserNotFoundError(NotFoundError):
    """ユーザーが見つからないエラー

    指定されたIDのユーザーが存在しない場合に発生します。

    使用例:
        raise UserNotFoundError("user-123")
    """

    def __init__(self, user_id: str) -> None:
        super().__init__(
            f"ユーザーが見つかりません: {user_id}",
            error_code="USER_NOT_FOUND",
        )
        self.user_id = user_id


class UserProfileNotFoundError(NotFoundError):
    """ユーザープロファイルが見つからないエラー

    ユーザーにプロファイルが設定されていない場合に発生します。

    使用例:
        raise UserProfileNotFoundError("user-123")
    """

    def __init__(self, user_id: str) -> None:
        super().__init__(
            f"ユーザープロファイルが見つかりません: {user_id}",
            error_code="USER_PROFILE_NOT_FOUND",
        )
        self.user_id = user_id


class DuplicateEmailError(ConflictError):
    """メールアドレス重複エラー

    既に使用されているメールアドレスで登録しようとした場合に発生します。

    使用例:
        raise DuplicateEmailError("test@example.com")
    """

    def __init__(self, email: str) -> None:
        super().__init__(
            f"このメールアドレスは既に使用されています: {email}",
            error_code="DUPLICATE_EMAIL",
        )
        self.email = email


class UserDeactivatedError(ValidationError):
    """ユーザー非アクティブエラー

    非アクティブなユーザーに対して操作を行おうとした場合に発生します。

    使用例:
        raise UserDeactivatedError("user-123")
    """

    def __init__(self, user_id: str) -> None:
        super().__init__(
            f"ユーザーは非アクティブです: {user_id}",
            error_code="USER_DEACTIVATED",
        )
        self.user_id = user_id
