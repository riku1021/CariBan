package sample

import (
	"context"
	"strconv"
	"sync"

	"cariban/go-server/internal/modules/sample/domain"
)

type storedRow struct {
	entity *domain.SampleEntity
}

type InMemoryRepository struct {
	mu      sync.RWMutex
	storage map[string]storedRow
	nextID  int
}

func NewInMemoryRepository() *InMemoryRepository {
	return &InMemoryRepository{
		storage: make(map[string]storedRow),
		nextID:  1,
	}
}

func (r *InMemoryRepository) Create(_ context.Context, entity *domain.SampleEntity) (*domain.SampleEntity, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	for storedID, row := range r.storage {
		if row.entity.Name.String() == entity.Name.String() {
			return nil, domain.DuplicateEntityError(storedID)
		}
	}

	entityID := strconv.Itoa(r.nextID)
	r.nextID++
	entity.SetID(entityID)
	r.storage[entityID] = storedRow{entity: copySample(entity)}
	return entity, nil
}

func (r *InMemoryRepository) FindByID(_ context.Context, id string) (*domain.SampleEntity, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	row, ok := r.storage[id]
	if !ok {
		return nil, domain.SampleNotFoundError(id)
	}
	return copySample(row.entity), nil
}

func (r *InMemoryRepository) FindAll(_ context.Context, limit, offset int) ([]*domain.SampleEntity, int, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	all := make([]*domain.SampleEntity, 0, len(r.storage))
	for _, row := range r.storage {
		all = append(all, copySample(row.entity))
	}
	total := len(all)
	if offset > total {
		return []*domain.SampleEntity{}, total, nil
	}
	end := offset + limit
	if end > total {
		end = total
	}
	return all[offset:end], total, nil
}

func (r *InMemoryRepository) Update(_ context.Context, entity *domain.SampleEntity) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, ok := r.storage[entity.ID]; !ok {
		return domain.SampleNotFoundError(entity.ID)
	}
	r.storage[entity.ID] = storedRow{entity: copySample(entity)}
	return nil
}

func (r *InMemoryRepository) Delete(_ context.Context, id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, ok := r.storage[id]; !ok {
		return domain.SampleNotFoundError(id)
	}
	delete(r.storage, id)
	return nil
}

func copySample(entity *domain.SampleEntity) *domain.SampleEntity {
	var description *string
	if entity.Description != nil {
		value := *entity.Description
		description = &value
	}
	copied := domain.ReconstructSample(entity.ID, entity.Name, description, entity.CreatedAt, entity.UpdatedAt)
	return copied
}
