"""共通ドメインエラー（共有版）

アプリケーション全体で使用される基底エラークラスを定義します。
各ドメインモジュールはこれらの基底クラスを継承して、
具体的なエラータイプを定義してください。

エラー階層:
- DomainError（基底）
  - ValidationError（バリデーションエラー）
  - NotFoundError（リソースが見つからない）
  - ConflictError（重複・競合エラー）
  - OperationError（操作エラー）
  - UnauthorizedError（認証エラー）
  - ForbiddenError（権限エラー）
"""


class DomainError(Exception):
    """ドメインエラーの基底クラス

    すべてのドメイン固有エラーはこのクラスを継承する必要があります。
    例外ハンドラーはこのクラスを使用してドメインエラーを識別します。

    Attributes:
        message: エラーメッセージ
        error_code: オプションのエラーコード（API レスポンス用）
    """

    def __init__(
        self, message: str = "エラーが発生しました", error_code: str = "DOMAIN_ERROR"
    ) -> None:
        self.message = message
        self.error_code = error_code
        super().__init__(message)


class ValidationError(DomainError):
    """バリデーションエラーの基底クラス

    入力データが要件を満たさない場合に発生させます。
    HTTP ステータスコード: 400 Bad Request
    """

    def __init__(
        self, message: str = "検証に失敗しました", error_code: str = "VALIDATION_ERROR"
    ) -> None:
        super().__init__(message, error_code)


class NotFoundError(DomainError):
    """リソースが見つからないエラーの基底クラス

    要求されたリソースが存在しない場合に発生させます。
    HTTP ステータスコード: 404 Not Found
    """

    def __init__(
        self, message: str = "リソースが見つかりません", error_code: str = "NOT_FOUND"
    ) -> None:
        super().__init__(message, error_code)


class ConflictError(DomainError):
    """競合エラーの基底クラス

    リソースの重複や状態の競合が発生した場合に発生させます。
    HTTP ステータスコード: 409 Conflict
    """

    def __init__(
        self, message: str = "リソースが競合しています", error_code: str = "CONFLICT"
    ) -> None:
        super().__init__(message, error_code)


class OperationError(DomainError):
    """操作エラーの基底クラス

    リポジトリ操作や外部サービス呼び出しが失敗した場合に発生させます。
    HTTP ステータスコード: 500 Internal Server Error
    """

    def __init__(
        self, message: str = "操作に失敗しました", error_code: str = "OPERATION_ERROR"
    ) -> None:
        super().__init__(message, error_code)


class UnauthorizedError(DomainError):
    """認証エラーの基底クラス

    認証が必要な操作で認証情報がない、または無効な場合に発生させます。
    HTTP ステータスコード: 401 Unauthorized
    """

    def __init__(self, message: str = "認証が必要です", error_code: str = "UNAUTHORIZED") -> None:
        super().__init__(message, error_code)


class ForbiddenError(DomainError):
    """権限エラーの基底クラス

    認証済みだが、リソースへのアクセス権限がない場合に発生させます。
    HTTP ステータスコード: 403 Forbidden
    """

    def __init__(
        self, message: str = "アクセス権限がありません", error_code: str = "FORBIDDEN"
    ) -> None:
        super().__init__(message, error_code)


__all__ = [
    "DomainError",
    "ValidationError",
    "NotFoundError",
    "ConflictError",
    "OperationError",
    "UnauthorizedError",
    "ForbiddenError",
]
