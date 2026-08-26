# 元アーキテクチャから Pragmatic Clean Architecture への移行手順

本テンプレートでは移行完了済みです。

このドキュメントでは、**横型レイヤード DDD**（`domain` / `usecase` / `adapter` / `infrastructure`）から、**Pragmatic Clean Architecture（DDD を含む）**（Vertical Slice + Modular Monolith + Ports & Adapters + 副作用の外出し）へ移行する手順を、本テンプレートで実施した内容に基づいてまとめます。移行先も **Domain-Driven Design (DDD)** を採用しており、レイヤの切り方と配置が変わるだけで、エンティティ・集約・リポジトリ・ドメインイベントなどの DDD パターンはそのまま用います。

---

## 1. 元のアーキテクチャと目標の対比

### 1.1 元のアーキテクチャ（横型レイヤ）

- **`src/domain/`** … ドメイン層（エンティティ・値オブジェクト・リポジトリインターフェース・ドメインサービス・イベント・共通基盤）
- **`src/usecase/`** … アプリケーション層（DTO・コマンド・クエリ）
- **`src/adapter/`** … アダプター層（HTTP ハンドラ・リポジトリ実装・DI）
- **`src/infrastructure/`** … インフラ層（設定・ロガー・ミドルウェア・イベント基盤）

特徴: 技術レイヤごとにディレクトリが分かれており、**Bounded Context（コンテキスト）ごとのまとまり**が横断的に分散していました。

**元の構成はヘキサゴナルアーキテクチャ（Ports & Adapters）として説明・構成されていました。** ドメインが**ポート**（リポジトリインターフェースなど）を定義し、**アダプター**（HTTP ハンドラ・リポジトリ実装）がそれを実装する依存の向きになっており、コードやコメントでも「ヘキサゴナルアーキテクチャのポート」と明示されていました。クリーンアーキテクチャやオニオンアーキテクチャと**対立するわけではなく**、依存の向き（外から内へ、中心にドメイン）という点ではいずれとも整合します。移行後も Ports & Adapters の考え方は維持され、モジュールごとにポートとアダプターが整理された形になります。

**ヘキサゴナルとクリーン・オニオンの関係:**

| 観点 | ヘキサゴナル | クリーンアーキテクチャ | オニオン |
|------|----------------|------------------------|----------|
| 中心 | ドメイン＋ポート（インターフェース） | エンティティ → ユースケース | ドメイン（最も内側） |
| 外側 | アダプター（ポートの実装） | インターフェースアダプター、フレームワーク | インフラ・アプリケーション |
| 依存の向き | 外→内 | 内側に向かう | 内側に向かう |

本テンプレートの元の構成は、**用語・レイヤの名前としてヘキサゴナルを採用していた**という整理が正確です。移行で変わるのは「横型レイヤ」から「Vertical Slice」への**配置**であり、Ports & Adapters という考え方自体は引き継がれています。

### 1.2 目標: Pragmatic Clean Architecture

- **Vertical Slice** … コンテキストごとに `modules/<context>/{domain, application, adapters, infrastructure, public}` をまとめる
- **Modular Monolith** … 単一デプロイ単位のまま、モジュール間の依存を Import Linter で厳格に禁止
- **Ports & Adapters** … 各モジュール内で「ポート（インターフェース）」と「アダプター（実装）」を分離
- **副作用の外出し（Functional Core / Imperative Shell）** … ドメイン・アプリケーションは純粋に保ち、I/O やフレームワーク依存は adapters / infrastructure に閉じる

**移行後の構成には DDD が含まれる:** 上記は「レイヤと依存の向き」の設計であり、**ドメインの考え方には Domain-Driven Design (DDD) をそのまま採用**しています。Aggregate Root・Entity・Value Object・Repository・Domain Event・Domain Service・Specification・CQRS などの DDD パターンは、Vertical Slice なモジュール構成のなかで引き続き用います（後述の「導入した構成における DDD」参照）。

**移行後のトップレベル構成:**

- **`src/bootstrap/`** … アプリ全体の組み立て（FastAPI 生成・ルーター集約・DI 登録・例外ハンドラ登録）
- **`src/shared/`** … 複数モジュールで共有するドメイン基盤（AggregateRoot, DomainEvent, Specification, 共通エラー）と技術ユーティリティ（設定・ロガー・HTTP 例外ハンドラなど）
- **`src/modules/<context>/`** … コンテキストごとの Vertical Slice（domain / application / adapters / infrastructure / public）
- **`src/adapter/`** … 薄いシェル（DI の橋渡し・ルーター集約用の `router.py`）とリポジトリ実装の配置
- **`src/infrastructure/`** … 技術的関心事（設定・ロガー・ミドルウェア・イベント）の実装

### 1.3 導入した構成における DDD

移行先（Pragmatic Clean Architecture）でも **DDD は採用したまま**です。役割の対応は次のとおりです。

| DDD の概念・パターン | 移行後の配置・役割 |
|----------------------|---------------------|
| **Bounded Context** | `modules/<context>` がコンテキスト単位（例: health, sample, user） |
| **Aggregate Root** | `shared/domain/aggregate_root.py` の基底と、各モジュールの `domain/entity.py`（User, SampleEntity など） |
| **Entity / 値オブジェクト** | 各 `modules/<context>/domain/` の entity, vo |
| **Repository（ポート）** | 各モジュールの `domain/repository.py`（インターフェース）。実装は `adapter/repository/` または `modules/<context>/infrastructure/` |
| **Domain Event** | `shared/domain/events.py` の基底と、各モジュールの `domain/events.py` |
| **Domain Service** | 各モジュールの `domain/service.py` |
| **Specification** | `shared/domain/specification.py` の基底と、必要に応じて各モジュールの specifications |
| **CQRS** | 各モジュールの `application/commands` と `application/queries` |

変更しているのは **「技術レイヤで横割り」から「コンテキストごとの Vertical Slice」への配置** であり、ドメインの表現（集約・リポジトリ・イベントなど）は DDD に沿ったままです。

---

## 2. 移行の全体フロー

移行は **段階的** に行い、各フェーズでテスト・Import Linter・型チェックが通る状態を保つことを推奨します。

| フェーズ | 内容 | 主な成果物 |
|----------|------|------------|
| 0 | 棚卸し・Import Linter の新契約定義 | 依存一覧、`.importlinter` の新レイヤ契約 |
| 1 | 共有ドメイン基盤の shared 移行 | `shared/domain/` に実体、旧 `domain` はラッパまたは削除 |
| 2 | モジュールの Vertical Slice 化 | `modules/<context>/{domain,application,adapters,...}` に実装移動 |
| 3 | HTTP アダプタの集約 | `modules.<context>.adapters.http` にルータ実装、旧 `adapter/http/*_handler` 削除 |
| 4 | 共通 HTTP 例外ハンドラの shared 化 | `shared/http/` に実体、`adapter/http/exception_handlers` 削除 |
| 5 | 旧レイヤの完全削除 | `src/domain`・`src/usecase` 削除、後方互換コードの削除 |
| 6 | ドキュメント・CI・境界の整備 | README、`.importlinter` 一般化、テストの import 修正、境界の型強化 |

---

## 3. フェーズ 0: 棚卸しと Import Linter の準備

### 3.1 やること

- `src/domain`・`src/usecase`・`src/adapter` を参照しているファイルを一覧化する（`grep` や IDE の参照検索）
- README・`.importlinter`・テスト・bootstrap が旧パスに依存していないか確認する
- 移行後の層構造に合わせて **Import Linter の契約を先に定義** する（`modules.*.domain` / `modules.*.application` の Core 保護、モジュール内レイヤ、モジュール間 independence）

### 3.2 Import Linter のポイント

- **Core がフレームワーク・Shell に依存しない**: `src.modules.*.domain` と `src.modules.*.application` から、fastapi / starlette / sqlalchemy / httpx / requests および `src.infrastructure`・`src.shared.middleware`・`src.shared.logger`・`src.shared.config` を禁止
- **モジュール内レイヤ**: 各 `src.modules.*` で `adapters` → `infrastructure` → `application` → `domain` の順序を強制
- **モジュール間の独立性**: `src.modules.*` 同士の相互 import を禁止

ワイルドカード（`src.modules.*`）を使うと、**モジュールを追加しても .importlinter の追記を最小にできる**ので推奨です。

---

## 4. フェーズ 1: 共有ドメイン基盤の shared 移行

### 4.1 対象

- `src/domain/aggregate_root.py`
- `src/domain/events.py`
- `src/domain/errors.py`
- `src/domain/specification.py`

これらは **複数コンテキストで共有** されるため、`src/shared/domain/` に実体を置きます。

### 4.2 手順

1. **`src/shared/domain/` を用意**し、上記の実装をコピー（または移動）する。import は `src.shared.domain` 内の相対またはローカルに統一する。
2. **旧 `src/domain/` の該当ファイル** は、一時的に `from src.shared.domain import ...` のラッパにしてもよい（後で削除）。
3. 既存の `from src.domain.events import DomainEvent` などを、**段階的に** `from src.shared.domain import ...` に置き換える。
4. テスト・アプリケーションコードで `src.domain`（共通基盤）の参照がなくなることを確認したうえで、**旧 `src/domain/` の共通基盤ファイルを削除**（ラッパも削除）する。

---

## 5. フェーズ 2: モジュールの Vertical Slice 化

### 5.1 方針

各 Bounded Context（例: sample, user, health）ごとに、**`src/modules/<context>/`** を用意し、その中に次のサブディレクトリを置きます。

- **`domain/`** … エンティティ・値オブジェクト・リポジトリインターフェース・ドメインサービス・イベント・エラー・Specification
- **`application/`** … DTO・コマンド・クエリ・ポート（インターフェースの再エクスポート）
- **`adapters/`** … HTTP ハンドラ（FastAPI ルーター）など
- **`infrastructure/`** … リポジトリ実装など、コンテキスト固有の技術詳細（必要なら）
- **`public/`** … 他モジュールに公開する API（必要なら）

### 5.2 手順（1 コンテキストずつ）

1. **`src/modules/<context>/domain/`** を作成し、`src/domain/<context>/` の内容を **実装ごと移動** する。import は `src.shared.domain` および同一モジュール内の相対に変更する。
2. **`src/modules/<context>/application/`** を作成し、`src/usecase/<context>/` の DTO・コマンド・クエリを **実装ごと移動** する。import は `src.modules.<context>.domain` および `src.shared.*` に変更する。
3. **`src/modules/<context>/adapters/http/`** を用意する。ここには後で「ルータ実装」を置く（フェーズ 3 で集約）。
4. 既存の参照（テスト・bootstrap・adapter の DI）を、`src.domain.<context>` / `src.usecase.<context>` から **`src.modules.<context>.domain` / `src.modules.<context>.application`** に切り替える。
5. 参照がゼロになったら **`src/domain/<context>/` と `src/usecase/<context>/` を削除** する。

コンテキストが複数ある場合は、**1 コンテキストずつ** 上記を繰り返すと安全です。

---

## 6. フェーズ 3: HTTP アダプタの集約

### 6.1 方針

HTTP ルーターの「実装」を **`src/adapter/http/` 配下の `*_handler.py`** に残すのではなく、**`src/modules/<context>/adapters/http/handler.py`** に集約します。`adapter/http` には、ルーターをまとめる `router.py` と DI 用の `dependencies.py` だけを残します。

### 6.2 手順

1. 各コンテキストについて、**`src/modules/<context>/adapters/http/handler.py`** に、従来 `src/adapter/http/<context>_handler.py` にあった **FastAPI ルーターの実装全体** を移動する（Pydantic モデル・エンドポイント定義を含む）。
2. **`src/modules/<context>/adapters/http/__init__.py`** で、`handler.router` を公開する。
3. **bootstrap（ルーター集約）** で、`src.adapter.http.<context>_handler` ではなく **`src.modules.<context>.adapters.http`** の `router` を `include_router` するように変更する。
4. 参照がなくなった **`src/adapter/http/<context>_handler.py`** を削除する（health 用があれば同様に `modules/health/adapters/http` に移し、旧ハンドラを削除）。

---

## 7. フェーズ 4: 共通 HTTP 例外ハンドラの shared 化

### 7.1 方針

グローバルな HTTP 例外ハンドラ（ドメインエラー → HTTP レスポンス）は、横断的な関心事なので **`src/shared/http/`** に置きます。

### 7.2 手順

1. **`src/shared/http/`** を用意し、`exception_handlers.py`（`setup_exception_handlers` など）の実装を、`src.shared.domain` のエラー型を参照する形で移動する。
2. **bootstrap（app_builder）** で、`setup_exception_handlers` の import を **`src.shared.http`** に変更する。
3. **`src/adapter/http/exception_handlers.py`** を削除する（中身はすでに `shared/http` に移しているため）。

---

## 8. フェーズ 5: 旧レイヤの完全削除

### 8.1 やること

- **`src/domain/`** と **`src/usecase/`** をディレクトリごと削除する（中身はすべて `shared` または `modules/<context>` に移済みの想定）。
- コード・ドキュメント・コメント内の **旧パス（`src.domain.*`, `src.usecase.*`）の参照** を検索し、`src.modules.*` または `src.shared.*` に置き換える。
- ドメイン・アプリケーションの docstring に「元の実装は `src.domain.*` に…」のような **移行履歴だけのコメント** が残っていれば、必要に応じて「Vertical Slice 移行済み」などの簡潔な説明に書き換える。

### 8.2 確認

- `grep -r "src\.domain\.\|src\.usecase\." --include="*.py" src tests` で、**ソース・テストに参照が残っていないこと** を確認する（キャッシュディレクトリは除く）。
- リポジトリ実装（`src/adapter/repository/`）が **`src.domain.*` を参照している場合** は、**`src.modules.<context>.domain`** に変更する。

---

## 9. フェーズ 6: ドキュメント・CI・境界の整備

### 9.1 README

- **ディレクトリ構造** を、`bootstrap` / `shared` / `modules` / `adapter` / `infrastructure` を主とした現行構成に合わせて書き換える。
- **カスタマイズ手順**（新規モジュールの追加）を、`domain/your_domain`・`usecase/your_domain` ではなく **`modules/<context>/{domain,application,adapters,...}`** ベースに修正する。
- コード例の import を、`src.domain.*` / `src.usecase.*` から **`src.shared.domain`** / **`src.modules.<context>.domain`** / **`src.modules.<context>.application`** に統一する。

### 9.2 .importlinter

- コメントで「Pragmatic Clean Architecture / Vertical Slice」「旧 domain/usecase は削除済み」であることを明記する。
- モジュール追加時に追記が少なくて済むよう、**ワイルドカード**（`src.modules.*.domain` など）を使った契約にしておく。

### 9.3 テスト・CI

- テストの import を、旧レイヤから **`src.modules.*`** および **`src.shared.*`** に合わせて修正する。
- CI（Lint / 型チェック / Import Linter / pytest）が通ることを確認する。
- `adapter/http/__init__.py` で、**削除済みのハンドラや exception_handlers を再エクスポートしていないか** を確認し、不要なら `__all__` をやめてパッケージ説明だけにする。

### 9.4 境界の型強化（推奨）

- **レスポンスの `list[dict]`** を、Pydantic のネストモデル（例: `list[SampleItemModel]`）に置き換える。
- **戻り値が `dict` のエンドポイント**（ヘルスチェック・デバッグ用など）を、Pydantic モデルに変更する。
- **ドメインの `to_dict()`** の戻り値を TypedDict で型付けする。
- **リポジトリのインメモリストア**（`dict[str, dict]`）を、TypedDict で形を固定した型に変更する。

---

## 10. チェックリスト（移行完了時の確認）

- [ ] `src/domain`・`src/usecase` が存在しない
- [ ] 共通ドメイン基盤は `src/shared/domain/` にあり、AggregateRoot / DomainEvent / Specification / 共通エラーがここで定義されている
- [ ] 各コンテキストが `src/modules/<context>/{domain,application,adapters,infrastructure,public}` で完結している
- [ ] HTTP ルーターの実装は `modules.<context>.adapters.http` にあり、`adapter/http` に `*_handler.py` は残っていない
- [ ] グローバル例外ハンドラは `src/shared/http/` にあり、`adapter/http/exception_handlers.py` は削除済み
- [ ] `.importlinter` が新レイヤ・ワイルドカードで契約されており、`lint-imports` が通る
- [ ] README・docs のディレクトリ説明とコード例が現行構成・import に一致している
- [ ] テスト・CI がすべて成功する
- [ ] （推奨）API 境界で `list[dict]` や `-> dict` をやめ、Pydantic / TypedDict で型を明示している
- [ ] （推奨）`adapter/repository` が `src.modules.<context>.domain` を参照している（旧 `src.domain` 参照なし）

---

## 11. 参考: 本テンプレートでの移行結果

- **bootstrap**: `app_builder.py` で FastAPI 生成・ルーター集約・例外ハンドラ登録、`router_registry.py` で各モジュールの `router` を `include_router`
- **shared**: `domain/`（AggregateRoot, DomainEvent, errors, specification）、`http/`（exception_handlers）
- **modules**: `health` / `sample` / `user` がそれぞれ Vertical Slice を構成
- **adapter**: `http/dependencies.py`・`http/router.py`、`repository/sample/`・`repository/user/`（実装は `src.modules.*.domain` を import）
- **infrastructure**: 設定・ロガー・ミドルウェア・イベント（変更なしでそのまま利用）

以上の手順で、元の横型レイヤから Pragmatic Clean Architecture への移行を一通り実施できます。既存プロジェクトに適用する場合は、コンテキスト数やテストの多さに応じてフェーズを細かく分け、都度コミットしながら進めることを推奨します。
