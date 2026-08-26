"""sample モジュールのインフラストラクチャ層。

既存のインメモリリポジトリ実装を再エクスポートします。
"""

from src.adapter.repository.sample.sample_repo import SampleRepositoryImpl

__all__ = ["SampleRepositoryImpl"]
