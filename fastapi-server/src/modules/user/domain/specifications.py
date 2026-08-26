"""user モジュールの Specification 定義。"""

from src.shared.domain import Specification

from .entity import User, UserStatus


class ActiveUserSpecification(Specification[User]):
    """アクティブユーザー Specification

    ステータスが ACTIVE のユーザーを判定します。

    使用例:
        spec = ActiveUserSpecification()
        active_users = [u for u in users if spec.is_satisfied_by(u)]
    """

    def is_satisfied_by(self, candidate: User) -> bool:
        return candidate.status == UserStatus.ACTIVE


class InactiveUserSpecification(Specification[User]):
    """非アクティブユーザー Specification

    ステータスが INACTIVE のユーザーを判定します。
    """

    def is_satisfied_by(self, candidate: User) -> bool:
        return candidate.status == UserStatus.INACTIVE


class SuspendedUserSpecification(Specification[User]):
    """一時停止ユーザー Specification

    ステータスが SUSPENDED のユーザーを判定します。
    """

    def is_satisfied_by(self, candidate: User) -> bool:
        return candidate.status == UserStatus.SUSPENDED


class HasProfileSpecification(Specification[User]):
    """プロファイルを持つユーザー Specification

    プロファイルが設定されているユーザーを判定します。

    使用例:
        spec = HasProfileSpecification()
        users_with_profile = [u for u in users if spec.is_satisfied_by(u)]
    """

    def is_satisfied_by(self, candidate: User) -> bool:
        return candidate.profile is not None


class HasCompleteProfileSpecification(Specification[User]):
    """完全なプロファイルを持つユーザー Specification

    bio と location が設定されているユーザーを判定します。
    """

    def is_satisfied_by(self, candidate: User) -> bool:
        if candidate.profile is None:
            return False
        return candidate.profile.is_complete()


class EmailDomainSpecification(Specification[User]):
    """特定ドメインのメールアドレスを持つユーザー Specification

    指定されたドメインのメールアドレスを持つユーザーを判定します。

    使用例:
        spec = EmailDomainSpecification("example.com")
        example_users = [u for u in users if spec.is_satisfied_by(u)]
    """

    def __init__(self, domain: str) -> None:
        self._domain = domain.lower()

    def is_satisfied_by(self, candidate: User) -> bool:
        return candidate.email.get_domain() == self._domain


class NameContainsSpecification(Specification[User]):
    """名前に特定の文字列を含むユーザー Specification

    名前に指定された文字列を含むユーザーを判定します。

    使用例:
        spec = NameContainsSpecification("山田")
        yamada_users = [u for u in users if spec.is_satisfied_by(u)]
    """

    def __init__(self, search_term: str) -> None:
        self._search_term = search_term.lower()

    def is_satisfied_by(self, candidate: User) -> bool:
        full_name = str(candidate.name).lower()
        return self._search_term in full_name
