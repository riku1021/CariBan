"""ユーザードメインのテスト

User Aggregate Root、UserProfile、値オブジェクト、
ドメインイベントのテストを含みます。
"""

import pytest

from src.modules.user.domain import (
    Email,
    User,
    UserCreatedEvent,
    UserDeactivatedEvent,
    UserEmailChangedEvent,
    UserName,
    UserProfile,
    UserProfileUpdatedEvent,
    UserStatus,
    UserValidationError,
)


class TestEmail:
    """Email 値オブジェクトのテスト"""

    def test_valid_email(self) -> None:
        """有効なメールアドレスを作成できる"""
        email = Email("test@example.com")
        assert email.value == "test@example.com"

    def test_email_normalized_to_lowercase(self) -> None:
        """メールアドレスが小文字に正規化される"""
        email = Email("Test@EXAMPLE.com")
        assert email.value == "test@example.com"

    def test_invalid_email_raises_error(self) -> None:
        """無効なメールアドレスはエラーになる"""
        with pytest.raises(UserValidationError):
            Email("invalid-email")

    def test_empty_email_raises_error(self) -> None:
        """空のメールアドレスはエラーになる"""
        with pytest.raises(UserValidationError):
            Email("")

    def test_email_get_domain(self) -> None:
        """ドメイン部分を取得できる"""
        email = Email("user@example.com")
        assert email.get_domain() == "example.com"

    def test_email_get_local_part(self) -> None:
        """ローカル部分を取得できる"""
        email = Email("user@example.com")
        assert email.get_local_part() == "user"

    def test_email_equality(self) -> None:
        """同じ値のメールアドレスは等しい"""
        email1 = Email("test@example.com")
        email2 = Email("TEST@example.com")
        assert email1 == email2


class TestUserName:
    """UserName 値オブジェクトのテスト"""

    def test_valid_username(self) -> None:
        """有効なユーザー名を作成できる"""
        name = UserName(first_name="太郎", last_name="山田")
        assert name.first_name == "太郎"
        assert name.last_name == "山田"

    def test_full_name(self) -> None:
        """フルネームを取得できる"""
        name = UserName(first_name="太郎", last_name="山田")
        assert name.full_name == "山田 太郎"

    def test_full_name_western(self) -> None:
        """西洋式フルネームを取得できる"""
        name = UserName(first_name="太郎", last_name="山田")
        assert name.full_name_western == "太郎 山田"

    def test_empty_first_name_raises_error(self) -> None:
        """空の名はエラーになる"""
        with pytest.raises(UserValidationError):
            UserName(first_name="", last_name="山田")

    def test_empty_last_name_raises_error(self) -> None:
        """空の姓はエラーになる"""
        with pytest.raises(UserValidationError):
            UserName(first_name="太郎", last_name="")

    def test_username_factory_method(self) -> None:
        """ファクトリーメソッドで作成できる"""
        name = UserName.create(first_name="太郎", last_name="山田")
        assert name.full_name == "山田 太郎"


class TestUserProfile:
    """UserProfile エンティティのテスト"""

    def test_create_empty_profile(self) -> None:
        """空のプロファイルを作成できる"""
        profile = UserProfile.create_empty()
        assert profile.bio is None
        assert profile.avatar_url is None

    def test_create_profile_with_bio(self) -> None:
        """bio 付きでプロファイルを作成できる"""
        profile = UserProfile(bio="自己紹介文")
        assert profile.bio == "自己紹介文"

    def test_bio_too_long_raises_error(self) -> None:
        """bio が長すぎるとエラーになる"""
        with pytest.raises(UserValidationError):
            UserProfile(bio="x" * 501)

    def test_invalid_avatar_url_raises_error(self) -> None:
        """無効なアバター URL はエラーになる"""
        with pytest.raises(UserValidationError):
            UserProfile(avatar_url="invalid-url")

    def test_valid_avatar_url(self) -> None:
        """有効なアバター URL を設定できる"""
        profile = UserProfile(avatar_url="https://example.com/avatar.png")
        assert profile.avatar_url == "https://example.com/avatar.png"

    def test_update_profile(self) -> None:
        """プロファイルを更新できる"""
        profile = UserProfile()
        profile.update(bio="新しい自己紹介", location="東京")
        assert profile.bio == "新しい自己紹介"
        assert profile.location == "東京"

    def test_is_complete(self) -> None:
        """プロファイルが完全かどうかを判定できる"""
        incomplete = UserProfile(bio="自己紹介")
        assert not incomplete.is_complete()

        complete = UserProfile(bio="自己紹介", location="東京")
        assert complete.is_complete()


class TestUser:
    """User Aggregate Root のテスト"""

    def test_create_user(self) -> None:
        """ユーザーを作成できる"""
        user = User.create(
            email=Email("test@example.com"),
            name=UserName(first_name="太郎", last_name="山田"),
        )
        assert str(user.email) == "test@example.com"
        assert str(user.name) == "山田 太郎"
        assert user.status == UserStatus.ACTIVE
        assert user.profile is not None

    def test_create_user_emits_event(self) -> None:
        """ユーザー作成時にドメインイベントが発行される"""
        user = User.create(
            email=Email("test@example.com"),
            name=UserName(first_name="太郎", last_name="山田"),
        )
        events = user.get_domain_events()
        assert len(events) == 1
        assert isinstance(events[0], UserCreatedEvent)

    def test_update_profile(self) -> None:
        """Aggregate Root を通じてプロファイルを更新できる"""
        user = User.create(
            email=Email("test@example.com"),
            name=UserName(first_name="太郎", last_name="山田"),
        )
        user.clear_domain_events()

        user.update_profile(bio="新しい自己紹介")
        assert user.profile is not None
        assert user.profile.bio == "新しい自己紹介"

        events = user.get_domain_events()
        assert len(events) == 1
        assert isinstance(events[0], UserProfileUpdatedEvent)

    def test_change_email(self) -> None:
        """メールアドレスを変更できる"""
        user = User.create(
            email=Email("old@example.com"),
            name=UserName(first_name="太郎", last_name="山田"),
        )
        user.clear_domain_events()

        user.change_email(Email("new@example.com"))
        assert str(user.email) == "new@example.com"

        events = user.get_domain_events()
        assert len(events) == 1
        assert isinstance(events[0], UserEmailChangedEvent)

    def test_deactivate_user(self) -> None:
        """ユーザーを非アクティブ化できる"""
        user = User.create(
            email=Email("test@example.com"),
            name=UserName(first_name="太郎", last_name="山田"),
        )
        user.clear_domain_events()

        user.deactivate(reason="テスト理由")
        assert user.status == UserStatus.INACTIVE
        assert not user.is_active()

        events = user.get_domain_events()
        assert len(events) == 1
        assert isinstance(events[0], UserDeactivatedEvent)

    def test_inactive_user_cannot_update_profile(self) -> None:
        """非アクティブユーザーはプロファイルを更新できない"""
        user = User.create(
            email=Email("test@example.com"),
            name=UserName(first_name="太郎", last_name="山田"),
        )
        user.deactivate()

        with pytest.raises(UserValidationError):
            user.update_profile(bio="更新しようとしている")

    def test_reconstruct_user(self) -> None:
        """永続化データからユーザーを再構築できる"""
        from datetime import datetime

        user = User.reconstruct(
            id="user-123",
            email=Email("test@example.com"),
            name=UserName(first_name="太郎", last_name="山田"),
            status=UserStatus.ACTIVE,
            profile=UserProfile(bio="自己紹介"),
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        assert user.id == "user-123"
        assert len(user.get_domain_events()) == 0  # 再構築時はイベントなし

    def test_clear_domain_events(self) -> None:
        """ドメインイベントをクリアできる"""
        user = User.create(
            email=Email("test@example.com"),
            name=UserName(first_name="太郎", last_name="山田"),
        )
        assert len(user.get_domain_events()) > 0

        user.clear_domain_events()
        assert len(user.get_domain_events()) == 0
