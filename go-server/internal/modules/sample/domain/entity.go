package domain

import (
	"time"

	shared "cariban/go-server/internal/shared/domain"
)

type SampleEntity struct {
	shared.AggregateRoot
	Name        SampleName
	Description *string
}

func CreateSample(name SampleName, description *string) (*SampleEntity, error) {
	if name.IsEmpty() {
		return nil, SampleValidationError("名前は空にできません")
	}

	entity := &SampleEntity{
		AggregateRoot: shared.NewAggregateRoot(),
		Name:          name,
		Description:   description,
	}
	entity.AddDomainEvent(NewSampleCreatedEvent("", name.String()))
	return entity, nil
}

func ReconstructSample(id string, name SampleName, description *string, createdAt, updatedAt time.Time) *SampleEntity {
	return &SampleEntity{
		AggregateRoot: shared.ReconstructAggregateRoot(id, createdAt, updatedAt),
		Name:          name,
		Description:   description,
	}
}
