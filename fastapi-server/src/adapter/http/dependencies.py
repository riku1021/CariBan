"""FastAPI 依存性注入

このモジュールは FastAPI ハンドラー用の依存性注入を提供します。
設定に基づいてリポジトリとユースケースのインスタンスを作成します。

パターン:
1. リポジトリ用のグローバル状態変数を定義
2. アプリケーション起動時に初期化
3. 依存性注入用のゲッター関数を提供
4. ハンドラーで使いやすいように型エイリアスを定義

CQRSパターン:
- コマンド（書き込み操作）: CreateSampleCommand など
- クエリ（読み取り操作）: GetSampleQuery, ListSamplesQuery など

イベントディスパッチャー:
- ドメインイベントを処理するためのディスパッチャー
- ハンドラーを登録してイベント駆動の処理を実現
"""

from typing import Annotated

from fastapi import Depends

from src.infrastructure.config.settings import Settings
from src.infrastructure.events import InProcessEventDispatcher
from src.infrastructure.events.handlers import AuditLogHandler
from src.modules.health.application import HealthCheckUseCase
from src.shared.events import IEventDispatcher

# =============================================================================
# TODO: ここにリポジトリとユースケースをインポートしてください
# =============================================================================
# from ...adapter.repository.sample.sample_repo import SampleRepositoryImpl
#
# CQRSパターン:
# from src.modules.sample.application.commands.create_sample import CreateSampleCommand
# from src.modules.sample.application.queries.get_sample import GetSampleQuery
# from src.modules.sample.application.queries.list_samples import ListSamplesQuery
# =============================================================================


# =============================================================================
# グローバル状態（起動時に初期化）
# =============================================================================
_settings: Settings | None = None
_event_dispatcher: IEventDispatcher | None = None

# TODO: ここにリポジトリインスタンスを追加
# _sample_repo: SampleRepositoryImpl | None = None


def initialize_dependencies(settings: Settings) -> None:
    """グローバル依存関係を初期化

    アプリケーション起動時に呼び出されます。

    Args:
        settings: アプリケーション設定
    """
    global _settings, _event_dispatcher
    _settings = settings

    # イベントディスパッチャーを初期化（インプロセス実装を使用）
    _event_dispatcher = InProcessEventDispatcher()

    # グローバルハンドラーを登録（すべてのイベントに対して実行）
    # 注意: register_global と register は InProcessEventDispatcher 固有のメソッドです
    # 他の実装では異なる方法でハンドラーを登録する必要があります
    if isinstance(_event_dispatcher, InProcessEventDispatcher):
        _event_dispatcher.register_global(AuditLogHandler())

        # サンプルイベント用のハンドラーを登録
        # from src.modules.sample.domain.events import SampleCreatedEvent
        # _event_dispatcher.register(SampleCreatedEvent, LoggingEventHandler())

    # ==========================================================================
    # TODO: ここでリポジトリとクライアントを初期化してください
    # ==========================================================================
    # global _sample_repo
    #
    # 例: データベースクライアントを初期化
    # db_config = settings.get_database_config()
    # db_client = DatabaseClient(db_config)
    #
    # 例: リポジトリを初期化
    # _sample_repo = SampleRepositoryImpl(db_client)
    #
    # 例: 外部 API クライアントを初期化
    # api_config = settings.get_external_api_config()
    # external_client = ExternalAPIClient(api_config)
    # ==========================================================================


async def cleanup_dependencies() -> None:
    """グローバル依存関係をクリーンアップ

    アプリケーションシャットダウン時に呼び出されます。
    """
    global _event_dispatcher

    # イベントディスパッチャーをクリア
    # 注意: clear は InProcessEventDispatcher 固有のメソッドです
    if _event_dispatcher and isinstance(_event_dispatcher, InProcessEventDispatcher):
        _event_dispatcher.clear()

    # ==========================================================================
    # TODO: ここでリソースをクリーンアップしてください
    # ==========================================================================
    # global _db_client
    #
    # if _db_client:
    #     await _db_client.close()
    # ==========================================================================


# =============================================================================
# 依存関係関数
# =============================================================================


def get_settings() -> Settings:
    """アプリケーション設定を取得

    Returns:
        アプリケーション設定

    Raises:
        RuntimeError: 設定が初期化されていない場合
    """
    if _settings is None:
        raise RuntimeError("設定が初期化されていません")
    return _settings


def get_event_dispatcher() -> IEventDispatcher:
    """イベントディスパッチャーを取得

    Returns:
        イベントディスパッチャー（抽象インターフェース）

    Raises:
        RuntimeError: イベントディスパッチャーが初期化されていない場合
    """
    if _event_dispatcher is None:
        raise RuntimeError("イベントディスパッチャーが初期化されていません")
    return _event_dispatcher


# =============================================================================
# TODO: リポジトリ用のゲッター関数を追加してください
# =============================================================================
#
# def get_sample_repo() -> SampleRepositoryImpl:
#     """サンプルリポジトリを取得
#
#     Returns:
#         サンプルリポジトリ
#
#     Raises:
#         RuntimeError: リポジトリが初期化されていない場合
#     """
#     if _sample_repo is None:
#         raise RuntimeError("サンプルリポジトリが初期化されていません")
#     return _sample_repo
# =============================================================================


# =============================================================================
# ユースケース依存関係
# =============================================================================


def get_health_check_usecase() -> HealthCheckUseCase:
    """ヘルスチェックユースケースを取得

    Returns:
        ヘルスチェックユースケース
    """
    return HealthCheckUseCase()


# =============================================================================
# TODO: コマンド/クエリ用のゲッター関数を追加してください（CQRSパターン）
# =============================================================================
#
# # コマンド（書き込み操作）
# def get_create_sample_command(
#     repo: Annotated[SampleRepositoryImpl, Depends(get_sample_repo)],
#     dispatcher: Annotated[IEventDispatcher, Depends(get_event_dispatcher)],
# ) -> CreateSampleCommand:
#     """サンプル作成コマンドを取得
#
#     Args:
#         repo: サンプルリポジトリ
#         dispatcher: イベントディスパッチャー
#
#     Returns:
#         サンプル作成コマンド
#     """
#     return CreateSampleCommand(repo, dispatcher)
#
#
# # クエリ（読み取り操作）
# def get_get_sample_query(
#     repo: Annotated[SampleRepositoryImpl, Depends(get_sample_repo)],
# ) -> GetSampleQuery:
#     """サンプル取得クエリを取得
#
#     Args:
#         repo: サンプルリポジトリ
#
#     Returns:
#         サンプル取得クエリ
#     """
#     return GetSampleQuery(repo)
#
#
# def get_list_samples_query(
#     repo: Annotated[SampleRepositoryImpl, Depends(get_sample_repo)],
# ) -> ListSamplesQuery:
#     """サンプル一覧クエリを取得
#
#     Args:
#         repo: サンプルリポジトリ
#
#     Returns:
#         サンプル一覧クエリ
#     """
#     return ListSamplesQuery(repo)
# =============================================================================


# =============================================================================
# ハンドラーで使いやすい型エイリアス
# =============================================================================

SettingsDep = Annotated[Settings, Depends(get_settings)]
EventDispatcherDep = Annotated[IEventDispatcher, Depends(get_event_dispatcher)]
HealthCheckUseCaseDep = Annotated[HealthCheckUseCase, Depends(get_health_check_usecase)]

# TODO: コマンド/クエリ用の型エイリアスを追加（CQRSパターン）
# CreateSampleCommandDep = Annotated[CreateSampleCommand, Depends(get_create_sample_command)]
# GetSampleQueryDep = Annotated[GetSampleQuery, Depends(get_get_sample_query)]
# ListSamplesQueryDep = Annotated[ListSamplesQuery, Depends(get_list_samples_query)]
