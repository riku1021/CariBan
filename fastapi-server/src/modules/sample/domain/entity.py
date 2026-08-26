"""sample モジュールのエンティティ定義。"""

from dataclasses import dataclass, field
from datetime import datetime

from src.shared.domain import AggregateRoot, DomainEvent

from .errors import SampleValidationError
from .events import SampleCreatedEvent, SampleDeletedEvent, SampleUpdatedEvent
from .vo import SampleValueObject


@dataclass
class SampleEntity(AggregateRoot):
    """サンプルエンティティ（Aggregate Root）- 実際のエンティティに置き換えてください

    エンティティは識別子（ID）とライフサイクル管理を持つドメインオブジェクトです。
    AggregateRoot を継承し、ドメインイベントの発行機能を持ちます。

    集約の整合性ルール:
    - 名前は空にできません
    - 名前は SampleValueObject で検証されます

    Attributes:
        id: 一意識別子（永続化後にリポジトリによって割り当て）
        name: エンティティ名（値オブジェクト）
        description: オプションの説明
        created_at: 作成日時
        updated_at: 最終更新日時
        _domain_events: ドメインイベントのリスト（AggregateRoot から継承）
    """

    name: SampleValueObject = field(default_factory=lambda: SampleValueObject(""))
    description: str | None = None
    _domain_events: list[DomainEvent] = field(default_factory=list, repr=False)

    def __post_init__(self) -> None:
        """初期化後にエンティティを検証

        Raises:
            SampleValidationError: 検証に失敗した場合
        """
        # 整合性ルールを強制
        if self.name.is_empty():
            raise SampleValidationError("名前は空にできません")

    def update_name(self, name: SampleValueObject) -> None:
        """エンティティ名を更新

        Args:
            name: 新しい名前

        Raises:
            SampleValidationError: 名前が無効な場合
        """
        # 整合性ルールを強制
        if name.is_empty():
            raise SampleValidationError("名前は空にできません")

        self.name = name
        self.touch()  # updated_at を更新

        # ドメインイベントを発行
        self.add_domain_event(
            SampleUpdatedEvent(
                sample_id=self.id,
                name=str(name),
                updated_at=self.updated_at,
            )
        )

    def mark_for_deletion(self) -> None:
        """削除のためにマーク

        実際の削除はリポジトリで行いますが、
        削除イベントを発行するためのメソッドです。
        """
        self.add_domain_event(
            SampleDeletedEvent(
                sample_id=self.id,
            )
        )

    @classmethod
    def create(
        cls,
        name: SampleValueObject,
        description: str | None = None,
    ) -> "SampleEntity":
        """新しいエンティティを作成

        新しいエンティティを作成するためのファクトリメソッドです。
        作成時にドメインイベントを発行します。

        Args:
            name: エンティティ名
            description: オプションの説明

        Returns:
            新しいエンティティインスタンス

        Raises:
            SampleValidationError: 検証に失敗した場合
        """
        entity = cls(
            name=name,
            description=description,
        )

        # ドメインイベントを発行
        # 注意: ID はまだ割り当てられていないため、空文字列です
        # リポジトリで永続化後に ID が設定されます
        entity.add_domain_event(
            SampleCreatedEvent(
                sample_id="",  # 永続化後に更新される可能性があります
                name=str(name),
            )
        )

        return entity

    @classmethod
    def reconstruct(
        cls,
        id: str,
        name: SampleValueObject,
        description: str | None,
        created_at: datetime,
        updated_at: datetime,
    ) -> "SampleEntity":
        """永続化データからエンティティを再構築

        リポジトリからデータを復元する際に使用します。
        再構築時にはドメインイベントは発行しません。

        Args:
            id: エンティティID
            name: エンティティ名
            description: オプションの説明
            created_at: 作成日時
            updated_at: 更新日時

        Returns:
            再構築されたエンティティインスタンス
        """
        entity = cls(
            id=id,
            name=name,
            description=description,
            created_at=created_at,
            updated_at=updated_at,
        )
        # 再構築時はイベントをクリア
        entity.clear_domain_events()
        return entity
