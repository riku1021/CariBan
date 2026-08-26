"""Specification パターンのテスト"""

from src.modules.user.domain import (
    ActiveUserSpecification,
    Email,
    EmailDomainSpecification,
    HasCompleteProfileSpecification,
    HasProfileSpecification,
    InactiveUserSpecification,
    NameContainsSpecification,
    User,
    UserName,
    UserProfile,
    UserStatus,
)


def create_test_user(
    email: str = "test@example.com",
    first_name: str = "太郎",
    last_name: str = "山田",
    status: UserStatus = UserStatus.ACTIVE,
    bio: str | None = None,
    location: str | None = None,
) -> User:
    """テスト用ユーザーを作成"""
    profile = (
        UserProfile(bio=bio, location=location) if bio or location else UserProfile.create_empty()
    )
    return User.reconstruct(
        id="user-123",
        email=Email(email),
        name=UserName(first_name=first_name, last_name=last_name),
        status=status,
        profile=profile,
        created_at=__import__("datetime").datetime.now(),
        updated_at=__import__("datetime").datetime.now(),
    )


class TestActiveUserSpecification:
    """ActiveUserSpecification のテスト"""

    def test_active_user_satisfies(self) -> None:
        """アクティブユーザーは Specification を満たす"""
        user = create_test_user(status=UserStatus.ACTIVE)
        spec = ActiveUserSpecification()
        assert spec.is_satisfied_by(user)

    def test_inactive_user_does_not_satisfy(self) -> None:
        """非アクティブユーザーは Specification を満たさない"""
        user = create_test_user(status=UserStatus.INACTIVE)
        spec = ActiveUserSpecification()
        assert not spec.is_satisfied_by(user)


class TestInactiveUserSpecification:
    """InactiveUserSpecification のテスト"""

    def test_inactive_user_satisfies(self) -> None:
        """非アクティブユーザーは Specification を満たす"""
        user = create_test_user(status=UserStatus.INACTIVE)
        spec = InactiveUserSpecification()
        assert spec.is_satisfied_by(user)

    def test_active_user_does_not_satisfy(self) -> None:
        """アクティブユーザーは Specification を満たさない"""
        user = create_test_user(status=UserStatus.ACTIVE)
        spec = InactiveUserSpecification()
        assert not spec.is_satisfied_by(user)


class TestHasProfileSpecification:
    """HasProfileSpecification のテスト"""

    def test_user_with_profile_satisfies(self) -> None:
        """プロファイルを持つユーザーは Specification を満たす"""
        user = create_test_user()
        spec = HasProfileSpecification()
        assert spec.is_satisfied_by(user)


class TestHasCompleteProfileSpecification:
    """HasCompleteProfileSpecification のテスト"""

    def test_user_with_complete_profile_satisfies(self) -> None:
        """完全なプロファイルを持つユーザーは Specification を満たす"""
        user = create_test_user(bio="自己紹介", location="東京")
        spec = HasCompleteProfileSpecification()
        assert spec.is_satisfied_by(user)

    def test_user_with_incomplete_profile_does_not_satisfy(self) -> None:
        """不完全なプロファイルを持つユーザーは Specification を満たさない"""
        user = create_test_user(bio="自己紹介")  # location なし
        spec = HasCompleteProfileSpecification()
        assert not spec.is_satisfied_by(user)


class TestEmailDomainSpecification:
    """EmailDomainSpecification のテスト"""

    def test_user_with_matching_domain_satisfies(self) -> None:
        """一致するドメインを持つユーザーは Specification を満たす"""
        user = create_test_user(email="user@company.com")
        spec = EmailDomainSpecification("company.com")
        assert spec.is_satisfied_by(user)

    def test_user_with_different_domain_does_not_satisfy(self) -> None:
        """異なるドメインを持つユーザーは Specification を満たさない"""
        user = create_test_user(email="user@example.com")
        spec = EmailDomainSpecification("company.com")
        assert not spec.is_satisfied_by(user)

    def test_case_insensitive(self) -> None:
        """ドメインの比較は大文字小文字を区別しない"""
        user = create_test_user(email="user@COMPANY.com")
        spec = EmailDomainSpecification("company.com")
        assert spec.is_satisfied_by(user)


class TestNameContainsSpecification:
    """NameContainsSpecification のテスト"""

    def test_name_contains_search_term(self) -> None:
        """名前に検索文字列を含むユーザーは Specification を満たす"""
        user = create_test_user(first_name="太郎", last_name="山田")
        spec = NameContainsSpecification("山田")
        assert spec.is_satisfied_by(user)

    def test_name_does_not_contain_search_term(self) -> None:
        """名前に検索文字列を含まないユーザーは Specification を満たさない"""
        user = create_test_user(first_name="太郎", last_name="山田")
        spec = NameContainsSpecification("鈴木")
        assert not spec.is_satisfied_by(user)


class TestCompositeSpecifications:
    """複合 Specification のテスト"""

    def test_and_specification(self) -> None:
        """AND Specification は両方を満たす場合のみ True"""
        user = create_test_user(status=UserStatus.ACTIVE, bio="自己紹介", location="東京")
        spec = ActiveUserSpecification() & HasCompleteProfileSpecification()
        assert spec.is_satisfied_by(user)

        inactive_user = create_test_user(
            status=UserStatus.INACTIVE, bio="自己紹介", location="東京"
        )
        assert not spec.is_satisfied_by(inactive_user)

    def test_or_specification(self) -> None:
        """OR Specification はいずれかを満たす場合に True"""
        active_user = create_test_user(status=UserStatus.ACTIVE)
        inactive_user = create_test_user(status=UserStatus.INACTIVE)

        spec = ActiveUserSpecification() | InactiveUserSpecification()
        assert spec.is_satisfied_by(active_user)
        assert spec.is_satisfied_by(inactive_user)

    def test_not_specification(self) -> None:
        """NOT Specification は元の Specification の逆"""
        active_user = create_test_user(status=UserStatus.ACTIVE)
        inactive_user = create_test_user(status=UserStatus.INACTIVE)

        spec = ~ActiveUserSpecification()
        assert not spec.is_satisfied_by(active_user)
        assert spec.is_satisfied_by(inactive_user)

    def test_complex_composite(self) -> None:
        """複雑な複合 Specification"""
        user = create_test_user(
            email="user@company.com",
            status=UserStatus.ACTIVE,
            bio="自己紹介",
            location="東京",
        )

        spec = (
            ActiveUserSpecification()
            & HasCompleteProfileSpecification()
            & EmailDomainSpecification("company.com")
        )
        assert spec.is_satisfied_by(user)

        # ドメインが異なる場合
        other_user = create_test_user(
            email="user@other.com",
            status=UserStatus.ACTIVE,
            bio="自己紹介",
            location="東京",
        )
        assert not spec.is_satisfied_by(other_user)
