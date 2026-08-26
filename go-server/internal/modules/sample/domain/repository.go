package domain

import "context"

type SampleRepository interface {
	Create(ctx context.Context, entity *SampleEntity) (*SampleEntity, error)
	FindByID(ctx context.Context, id string) (*SampleEntity, error)
	FindAll(ctx context.Context, limit, offset int) ([]*SampleEntity, int, error)
	Update(ctx context.Context, entity *SampleEntity) error
	Delete(ctx context.Context, id string) error
}
