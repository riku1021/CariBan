package domain

import (
	"time"

	"github.com/google/uuid"
)

// Event はドメインイベントの共通インターフェース。
type Event interface {
	EventID() string
	EventType() string
	OccurredAt() time.Time
}

// BaseEvent はドメインイベントの共通フィールド。
type BaseEvent struct {
	ID   string
	Type string
	At   time.Time
}

func NewBaseEvent(eventType string) BaseEvent {
	return BaseEvent{
		ID:   uuid.NewString(),
		Type: eventType,
		At:   time.Now().UTC(),
	}
}

func (e BaseEvent) EventID() string       { return e.ID }
func (e BaseEvent) EventType() string     { return e.Type }
func (e BaseEvent) OccurredAt() time.Time { return e.At }
