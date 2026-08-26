package events

import (
	"context"
	"log"

	"cariban/go-server/internal/shared/domain"
)

// Dispatcher はドメインイベントを処理するポート。
type Dispatcher interface {
	DispatchAll(ctx context.Context, events []domain.Event) error
}

// LogDispatcher はイベントをログ出力する開発用実装。
type LogDispatcher struct{}

func NewLogDispatcher() *LogDispatcher {
	return &LogDispatcher{}
}

func (d *LogDispatcher) DispatchAll(_ context.Context, events []domain.Event) error {
	for _, event := range events {
		log.Printf("domain event: type=%s id=%s occurred_at=%s", event.EventType(), event.EventID(), event.OccurredAt().Format("2006-01-02T15:04:05Z07:00"))
	}
	return nil
}

// NopDispatcher は何もしない実装。
type NopDispatcher struct{}

func NewNopDispatcher() *NopDispatcher {
	return &NopDispatcher{}
}

func (d *NopDispatcher) DispatchAll(_ context.Context, _ []domain.Event) error {
	return nil
}
