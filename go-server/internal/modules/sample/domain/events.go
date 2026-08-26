package domain

import (
	shared "cariban/go-server/internal/shared/domain"
)

type SampleCreatedEvent struct {
	shared.BaseEvent
	SampleID string
	Name     string
}

func NewSampleCreatedEvent(sampleID, name string) SampleCreatedEvent {
	return SampleCreatedEvent{
		BaseEvent: shared.NewBaseEvent("SampleCreatedEvent"),
		SampleID:  sampleID,
		Name:      name,
	}
}
