"""Aggregate Root 基底クラス（共有版）

Aggregate Root（集約ルート）は、関連するエンティティと値オブジェクトの
グループ（集約）のエントリーポイントです。

集約の特性:
- 集約内の整合性を保証する
- 外部からは Aggregate Root を通じてのみアクセスできる
- トランザクションの境界となる
- ドメインイベントを管理する

使用例:
    class Order(AggregateRoot):
        def __init__(self, id: str, customer_id: str) -> None:
            super().__init__(id)
            self.customer_id = customer_id
            self._order_items: list[OrderItem] = []

        def add_item(self, product_id: str, quantity: int) -> None:
            # 集約内の整合性を保証
            if quantity <= 0:
                raise ValidationError("数量は1以上である必要があります")

            item = OrderItem(product_id=product_id, quantity=quantity)
            self._order_items.append(item)

            # ドメインイベントを発行
            self.add_domain_event(OrderItemAddedEvent(
                order_id=self.id,
                product_id=product_id,
                quantity=quantity,
            ))
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import TypeVar

from .events import DomainEvent

T = TypeVar("T", bound="AggregateRoot")


@dataclass
class AggregateRoot:
    """Aggregate Root の基底クラス

    すべての集約ルートはこのクラスを継承する必要があります。
    ドメインイベントの管理機能を提供します。

    Attributes:
        id: 集約の一意識別子
        created_at: 作成日時
        updated_at: 最終更新日時
        _domain_events: 発行されたドメインイベントのリスト（内部用）
    """

    id: str = ""
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)
    _domain_events: list[DomainEvent] = field(default_factory=list, repr=False)

    def add_domain_event(self, event: DomainEvent) -> None:
        """ドメインイベントを追加

        集約内で発生した重要な出来事をイベントとして記録します。
        イベントはユースケース層で取得され、適切に処理されます。

        Args:
            event: 追加するドメインイベント
        """
        self._domain_events.append(event)

    def get_domain_events(self) -> list[DomainEvent]:
        """発行されたドメインイベントを取得

        Returns:
            ドメインイベントのリスト（コピー）
        """
        return list(self._domain_events)

    def clear_domain_events(self) -> None:
        """ドメインイベントをクリア

        イベントを処理した後にクリアします。
        """
        self._domain_events.clear()

    def set_id(self, id: str) -> None:
        """集約IDを設定

        永続化後にリポジトリによって呼び出されます。

        Args:
            id: 集約ID
        """
        self.id = id

    def touch(self) -> None:
        """更新日時を更新

        エンティティが変更されたときに呼び出します。
        """
        self.updated_at = datetime.now()


__all__ = ["AggregateRoot"]
