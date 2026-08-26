package queries

import (
	"context"

	"cariban/go-server/internal/modules/sample/application"
	"cariban/go-server/internal/modules/sample/domain"
)

type ListSamplesQuery struct {
	repository domain.SampleRepository
}

func NewListSamplesQuery(repository domain.SampleRepository) *ListSamplesQuery {
	return &ListSamplesQuery{repository: repository}
}

func (q *ListSamplesQuery) Execute(ctx context.Context, req application.ListSamplesRequest) (application.ListSamplesResponse, error) {
	limit := req.Limit
	if limit <= 0 {
		limit = 10
	}
	offset := req.Offset
	if offset < 0 {
		offset = 0
	}

	entities, total, err := q.repository.FindAll(ctx, limit, offset)
	if err != nil {
		return application.ListSamplesResponse{}, err
	}

	items := make([]application.SampleItem, 0, len(entities))
	for _, entity := range entities {
		items = append(items, application.SampleItem{
			ID:        entity.ID,
			Name:      entity.Name.String(),
			CreatedAt: entity.CreatedAt,
		})
	}

	return application.ListSamplesResponse{
		Items:  items,
		Total:  total,
		Limit:  limit,
		Offset: offset,
	}, nil
}
