package queries

import (
	"context"

	"cariban/go-server/internal/modules/sample/application"
	"cariban/go-server/internal/modules/sample/domain"
)

type GetSampleQuery struct {
	repository domain.SampleRepository
}

func NewGetSampleQuery(repository domain.SampleRepository) *GetSampleQuery {
	return &GetSampleQuery{repository: repository}
}

func (q *GetSampleQuery) Execute(ctx context.Context, id string) (application.GetSampleResponse, error) {
	entity, err := q.repository.FindByID(ctx, id)
	if err != nil {
		return application.GetSampleResponse{}, err
	}

	return application.GetSampleResponse{
		ID:          entity.ID,
		Name:        entity.Name.String(),
		Description: entity.Description,
		CreatedAt:   entity.CreatedAt,
		UpdatedAt:   entity.UpdatedAt,
	}, nil
}
