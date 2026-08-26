"""user モジュールのポート定義。

アプリケーション層から参照されるリポジトリやドメインサービスの抽象を集約します。
"""

from src.modules.user.domain import UserDomainService, UserRepository

__all__ = ["UserRepository", "UserDomainService"]
