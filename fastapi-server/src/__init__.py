"""FastAPI Pragmatic Clean Architecture テンプレート

Domain-Driven Design (DDD) と Pragmatic Clean Architecture
（Vertical Slice + Modular Monolith + Ports & Adapters）に基づいた
FastAPI アプリケーションのテンプレートです。

主要ディレクトリ構造:
- bootstrap/: アプリ全体の組み立て（FastAPI, ルーター集約, DI など）
- shared/: 複数モジュールで共有されるドメイン基盤・技術ユーティリティ
- modules/: Bounded Context ごとのモジュール（domain / application / adapters / infrastructure / public）
- adapter/: HTTP やリポジトリ実装など、既存インフラとの橋渡し（薄いシェル）
- infrastructure/: 設定・ロギング・ミドルウェア・イベントなど技術的な基盤実装
"""
