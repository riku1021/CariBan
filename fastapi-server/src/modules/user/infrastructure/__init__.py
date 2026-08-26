"""user モジュールのインフラストラクチャ層。

既存のインメモリユーザーリポジトリ実装を再エクスポートします。
"""

from src.adapter.repository.user.user_repo import InMemoryUserRepository

__all__ = ["InMemoryUserRepository"]
