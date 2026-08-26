package commands

import (
	"context"

	"cariban/go-server/internal/modules/sample/application"
	"cariban/go-server/internal/modules/sample/domain"
	"cariban/go-server/internal/shared/events"
)

type CreateSampleCommand struct {
	repository domain.SampleRepository
	dispatcher events.Dispatcher
}

func NewCreateSampleCommand(repository domain.SampleRepository, dispatcher events.Dispatcher) *CreateSampleCommand {
	return &CreateSampleCommand{repository: repository, dispatcher: dispatcher}
}

func (c *CreateSampleCommand) Execute(ctx context.Context, req application.CreateSampleRequest) (application.CreateSampleResponse, error) {
	name, err := domain.NewSampleName(req.Name)
	if err != nil {
		return application.CreateSampleResponse{}, err
	}

	entity, err := domain.CreateSample(name, req.Description)
	if err != nil {
		return application.CreateSampleResponse{}, err
	}

	created, err := c.repository.Create(ctx, entity)
	if err != nil {
		return application.CreateSampleResponse{}, err
	}

	if c.dispatcher != nil {
		if err := c.dispatcher.DispatchAll(ctx, created.DomainEvents()); err != nil {
			return application.CreateSampleResponse{}, err
		}
		created.ClearDomainEvents()
	}

	return application.CreateSampleResponse{
		ID:        created.ID,
		Name:      created.Name.String(),
		CreatedAt: created.CreatedAt,
	}, nil
}
