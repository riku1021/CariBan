"""Initial schema (empty scaffold).

Revision ID: 202608250001
Revises:
Create Date: 2026-08-25
"""

from collections.abc import Sequence

revision: str = "202608250001"
down_revision: str | Sequence[str] | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
