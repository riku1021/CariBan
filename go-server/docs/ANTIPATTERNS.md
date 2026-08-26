# DDD アンチパターンガイド

Go で Domain-Driven Design を実装する際に避けるべきパターンです。

---

## 1. Anemic Domain Model（貧血症ドメインモデル）

エンティティがデータだけを持ち、ビジネスルールが application 層に散らばる状態です。

悪い例:

```go
type User struct {
    Status string
}

func Deactivate(user *User) {
    if user.Status == "inactive" {
        panic("already inactive")
    }
    user.Status = "inactive"
}
```

良い例: ルールとイベント発行を集約ルートに置く。

```go
func (u *User) Deactivate(reason *string) {
    u.Status = UserStatusInactive
    u.Touch()
    u.AddDomainEvent(NewUserDeactivatedEvent(u.ID, reason, u.UpdatedAt))
}
```

---

## 2. 値オブジェクトを素の string のまま扱う

メールや名前の検証をハンドラーやコマンドに書くと、同じルールが複製されます。`Email` / `UserName` のような値オブジェクトで自己検証してください。

---

## 3. リポジトリからドメインを漏らす

SQL の行型や JSON タグ付きの永続化構造体を application / domain に公開しないでください。変換は adapter 層で完結させます。

---

## 4. ハンドラーでビジネス判断をする

HTTP ハンドラーは JSON の入出力とステータス変換に留め、作成・重複チェック・非アクティブ化は command / domain に任せます。

---

## 5. フレームワークへの依存を domain に入れる

`net/http` や pgx の型を domain パッケージから参照しないでください。ポート（interface）だけを定義します。
