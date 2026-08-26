package domain

import "time"

// AggregateRoot は集約ルートの共通状態。
type AggregateRoot struct {
	ID        string
	CreatedAt time.Time
	UpdatedAt time.Time
	events    []Event
}

func NewAggregateRoot() AggregateRoot {
	now := time.Now().UTC()
	return AggregateRoot{
		CreatedAt: now,
		UpdatedAt: now,
		events:    nil,
	}
}

func ReconstructAggregateRoot(id string, createdAt, updatedAt time.Time) AggregateRoot {
	return AggregateRoot{
		ID:        id,
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
		events:    nil,
	}
}

func (a *AggregateRoot) SetID(id string) {
	a.ID = id
}

func (a *AggregateRoot) Touch() {
	a.UpdatedAt = time.Now().UTC()
}

func (a *AggregateRoot) AddDomainEvent(event Event) {
	a.events = append(a.events, event)
}

func (a *AggregateRoot) DomainEvents() []Event {
	copied := make([]Event, len(a.events))
	copy(copied, a.events)
	return copied
}

func (a *AggregateRoot) ClearDomainEvents() {
	a.events = nil
}
