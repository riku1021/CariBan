"""サンプルイベントハンドラー

イベントハンドラーの実装例を提供します。
実際のプロジェクトでは、これらを参考に独自のハンドラーを実装してください。

ハンドラーの種類:
- LoggingEventHandler: イベントをログに記録
- AuditLogHandler: 監査ログを記録（グローバルハンドラー用）
- NotificationHandler: 通知を送信（例: メール、Slack）
"""

from src.shared.domain import DomainEvent
from src.shared.events import EventHandler

from ..logger.logger import logger


class LoggingEventHandler(EventHandler):
    """ロギングイベントハンドラー

    イベントの詳細をログに記録します。
    デバッグや監視目的で使用できます。

    使用例:
        dispatcher.register(SampleCreatedEvent, LoggingEventHandler())
    """

    def __init__(self, log_level: str = "info") -> None:
        """ハンドラーを初期化

        Args:
            log_level: ログレベル（"debug", "info", "warning", "error"）
        """
        self._log_level = log_level

    async def handle(self, event: DomainEvent) -> None:
        """イベントをログに記録

        Args:
            event: 処理するドメインイベント
        """
        message = (
            f"[{event.event_type}] "
            f"event_id={event.event_id}, "
            f"occurred_at={event.occurred_at.isoformat()}"
        )

        # イベントの追加属性をログに含める
        event_attrs = {
            k: v
            for k, v in event.__dict__.items()
            if not k.startswith("_") and k not in ("event_id", "occurred_at")
        }
        if event_attrs:
            message += f", data={event_attrs}"

        if self._log_level == "debug":
            logger.debug(message)
        elif self._log_level == "info":
            logger.info(message)
        elif self._log_level == "warning":
            logger.warning(message)
        elif self._log_level == "error":
            logger.error(message)
        else:
            logger.info(message)


class AuditLogHandler(EventHandler):
    """監査ログハンドラー

    すべてのドメインイベントを監査ログとして記録します。
    セキュリティやコンプライアンス目的で使用できます。

    グローバルハンドラーとして登録することで、
    すべてのイベントを監査ログに記録できます。

    使用例:
        dispatcher.register_global(AuditLogHandler())
    """

    def __init__(self, audit_logger_name: str = "audit") -> None:
        """ハンドラーを初期化

        Args:
            audit_logger_name: 監査ログ用のロガー名
        """
        self._audit_logger_name = audit_logger_name

    async def handle(self, event: DomainEvent) -> None:
        """イベントを監査ログに記録

        Args:
            event: 処理するドメインイベント
        """
        # 監査ログ用のフォーマット
        audit_entry = {
            "event_type": event.event_type,
            "event_id": event.event_id,
            "occurred_at": event.occurred_at.isoformat(),
            "data": {
                k: v
                for k, v in event.__dict__.items()
                if not k.startswith("_") and k not in ("event_id", "occurred_at")
            },
        }

        # 監査ログとして記録
        # 実際のプロジェクトでは、専用の監査ログシステムに送信することを推奨
        logger.info(f"[AUDIT] {audit_entry}")


class NotificationHandler(EventHandler):
    """通知ハンドラー

    イベント発生時に通知を送信します。
    メール、Slack、プッシュ通知などに使用できます。

    使用例:
        # メール通知用
        dispatcher.register(UserCreatedEvent, NotificationHandler(
            notification_type="email",
            template="user_welcome",
        ))

        # Slack 通知用
        dispatcher.register(OrderCreatedEvent, NotificationHandler(
            notification_type="slack",
            channel="#orders",
        ))
    """

    def __init__(
        self,
        notification_type: str = "log",
        **kwargs: str,
    ) -> None:
        """ハンドラーを初期化

        Args:
            notification_type: 通知タイプ（"email", "slack", "push", "log"）
            **kwargs: 通知タイプ固有のオプション
        """
        self._notification_type = notification_type
        self._options = kwargs

    async def handle(self, event: DomainEvent) -> None:
        """通知を送信

        Args:
            event: 処理するドメインイベント
        """
        if self._notification_type == "email":
            await self._send_email_notification(event)
        elif self._notification_type == "slack":
            await self._send_slack_notification(event)
        elif self._notification_type == "push":
            await self._send_push_notification(event)
        else:
            # デフォルトはログ出力
            await self._log_notification(event)

    async def _send_email_notification(self, event: DomainEvent) -> None:
        """メール通知を送信（スタブ実装）"""
        template = self._options.get("template", "default")
        logger.info(f"[NOTIFICATION:EMAIL] event={event.event_type}, template={template}")
        # TODO: 実際のメール送信処理を実装
        # await email_service.send(template=template, data=event.__dict__)

    async def _send_slack_notification(self, event: DomainEvent) -> None:
        """Slack 通知を送信（スタブ実装）"""
        channel = self._options.get("channel", "#general")
        logger.info(f"[NOTIFICATION:SLACK] event={event.event_type}, channel={channel}")
        # TODO: 実際の Slack 送信処理を実装
        # await slack_client.post(channel=channel, message=str(event))

    async def _send_push_notification(self, event: DomainEvent) -> None:
        """プッシュ通知を送信（スタブ実装）"""
        logger.info(f"[NOTIFICATION:PUSH] event={event.event_type}")
        # TODO: 実際のプッシュ通知処理を実装
        # await push_service.send(event=event)

    async def _log_notification(self, event: DomainEvent) -> None:
        """ログに通知を記録"""
        logger.info(f"[NOTIFICATION:LOG] event={event.event_type}, event_id={event.event_id}")


# =============================================================================
# カスタムハンドラーの実装例
# =============================================================================
#
# 特定のイベントに対する専用ハンドラーを実装する場合:
#
# from ...domain.sample.events import SampleCreatedEvent
#
# class SampleCreatedHandler(EventHandler):
#     """サンプル作成イベント専用ハンドラー"""
#
#     def __init__(self, some_service: SomeService) -> None:
#         self._some_service = some_service
#
#     async def handle(self, event: DomainEvent) -> None:
#         if not isinstance(event, SampleCreatedEvent):
#             return
#
#         # サンプル作成時の処理
#         await self._some_service.do_something(event.sample_id)
#         logger.info(f"サンプル {event.sample_id} の処理が完了しました")
# =============================================================================
