"""サンプルリポジトリ実装 - テンプレート例

リポジトリ実装は以下を行います:
- ドメイン層で定義されたインターフェースを実装
- データ永続化を処理（データベース、API、ファイルなど）
- ドメインエンティティと永続化モデル間の変換
- エラーを処理しドメインエラーでラップ
"""

from datetime import datetime
from typing import TypedDict

from src.modules.sample.domain import (
    DuplicateEntityError,
    RepositoryOperationError,
    SampleEntity,
    SampleNotFoundError,
    SampleRepository,
    SampleValueObject,
)


class SampleStoredRow(TypedDict):
    """インメモリストレージに保存する 1 件の型（dict の形を固定）"""

    id: str
    name: str
    description: str | None
    created_at: datetime
    updated_at: datetime


class SampleRepositoryImpl(SampleRepository):
    """サンプルリポジトリ実装

    TODO: 実際のデータソース実装に置き換えてください。
    この例ではデモンストレーション用にインメモリストレージを使用しています。

    本番環境では以下で実装してください:
    - データベース（PostgreSQL, MySQL, MongoDB など）
    - 外部 API
    - ファイルストレージ
    - など
    """

    def __init__(self) -> None:
        """リポジトリを初期化

        TODO: データソースクライアント（データベース、API クライアントなど）を受け取る

        例:
            def __init__(self, db_client: DatabaseClient) -> None:
                self._db = db_client
        """
        # デモンストレーション用のインメモリストレージ
        self._storage: dict[str, SampleStoredRow] = {}
        self._next_id = 1

    async def create(self, entity: SampleEntity) -> SampleEntity:
        """新しいエンティティを作成

        Args:
            entity: 作成するエンティティ

        Returns:
            ID が割り当てられた作成済みエンティティ

        Raises:
            RepositoryOperationError: 作成に失敗した場合
            DuplicateEntityError: 同一キーのエンティティが既に存在する場合
        """
        try:
            # -------------------------------------------------------------
            # 重複チェックの例:
            #   ここでは「name が同じエンティティが既に存在する場合」は
            #   DuplicateEntityError を発生させるサンプル実装にしています。
            #   実際のプロジェクトではユニークキー（メールアドレスやコードなど）
            #   に合わせて判定条件を変更してください。
            # -------------------------------------------------------------
            for stored_id, stored in self._storage.items():
                if stored["name"] == str(entity.name):
                    # 既に同じ name を持つエンティティが存在するためエラー
                    raise DuplicateEntityError(entity_id=stored_id)

            # ID を生成
            entity_id = str(self._next_id)
            self._next_id += 1

            # エンティティデータを保存
            row: SampleStoredRow = {
                "id": entity_id,
                "name": str(entity.name),
                "description": entity.description,
                "created_at": entity.created_at,
                "updated_at": entity.updated_at,
            }
            self._storage[entity_id] = row

            # エンティティに ID を設定して返却
            entity.set_id(entity_id)
            return entity

        except Exception as e:
            raise RepositoryOperationError(str(e))

    async def find_by_id(self, id: str) -> SampleEntity | None:
        """ID でエンティティを検索

        Args:
            id: エンティティ ID

        Returns:
            見つかった場合はエンティティ、そうでなければ None
        """
        data = self._storage.get(id)
        if data is None:
            return None

        return SampleEntity.reconstruct(
            id=data["id"],
            name=SampleValueObject(data["name"]),
            description=data["description"],
            created_at=data["created_at"],
            updated_at=data["updated_at"],
        )

    async def find_all(
        self,
        limit: int = 10,
        offset: int = 0,
    ) -> tuple[list[SampleEntity], int]:
        """ページネーション付きで全エンティティを検索

        Args:
            limit: 返すエンティティの最大数
            offset: スキップするエンティティの数

        Returns:
            （エンティティのリスト、総数）のタプル
        """
        all_items = list(self._storage.values())
        total = len(all_items)

        # ページネーションを適用
        paginated = all_items[offset : offset + limit]

        entities = [
            SampleEntity.reconstruct(
                id=data["id"],
                name=SampleValueObject(data["name"]),
                description=data["description"],
                created_at=data["created_at"],
                updated_at=data["updated_at"],
            )
            for data in paginated
        ]

        return entities, total

    async def update(self, entity: SampleEntity) -> None:
        """既存のエンティティを更新

        Args:
            entity: 更新するエンティティ

        Raises:
            SampleNotFoundError: エンティティが見つからない場合
            RepositoryOperationError: 更新に失敗した場合
        """
        if entity.id not in self._storage:
            raise SampleNotFoundError(entity.id)

        try:
            row: SampleStoredRow = {
                "id": entity.id,
                "name": str(entity.name),
                "description": entity.description,
                "created_at": entity.created_at,
                "updated_at": entity.updated_at,
            }
            self._storage[entity.id] = row
        except Exception as e:
            raise RepositoryOperationError(str(e))

    async def delete(self, id: str) -> None:
        """エンティティを削除

        Args:
            id: 削除するエンティティの ID

        Raises:
            SampleNotFoundError: エンティティが見つからない場合
        """
        if id not in self._storage:
            raise SampleNotFoundError(id)

        del self._storage[id]


# =============================================================================
# 例: データベースリポジトリ実装
# =============================================================================
#
# class SampleRepositoryPostgres(SampleRepository):
#     """SampleRepository の PostgreSQL 実装"""
#
#     def __init__(self, db_pool: asyncpg.Pool) -> None:
#         self._pool = db_pool
#
#     async def create(self, entity: SampleEntity) -> SampleEntity:
#         async with self._pool.acquire() as conn:
#             row = await conn.fetchrow(
#                 """
#                 INSERT INTO samples (name, description, created_at, updated_at)
#                 VALUES ($1, $2, $3, $4)
#                 RETURNING id
#                 """,
#                 str(entity.name),
#                 entity.description,
#                 entity.created_at,
#                 entity.updated_at,
#             )
#             entity.set_id(str(row["id"]))
#             return entity
#
#     async def find_by_id(self, id: str) -> Optional[SampleEntity]:
#         async with self._pool.acquire() as conn:
#             row = await conn.fetchrow(
#                 "SELECT * FROM samples WHERE id = $1",
#                 int(id),
#             )
#             if row is None:
#                 return None
#             return self._row_to_entity(row)
#
#     def _row_to_entity(self, row) -> SampleEntity:
#         return SampleEntity.reconstruct(
#             id=str(row["id"]),
#             name=SampleValueObject(row["name"]),
#             description=row["description"],
#             created_at=row["created_at"],
#             updated_at=row["updated_at"],
#         )
# =============================================================================
