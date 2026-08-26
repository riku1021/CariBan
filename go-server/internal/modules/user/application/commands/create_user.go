package commands

import (
	"context"

	"cariban/go-server/internal/modules/user/application"
	"cariban/go-server/internal/modules/user/domain"
	"cariban/go-server/internal/shared/events"
)

type CreateUserCommand struct {
	service    *domain.UserDomainService
	dispatcher events.Dispatcher
}

func NewCreateUserCommand(service *domain.UserDomainService, dispatcher events.Dispatcher) *CreateUserCommand {
	return &CreateUserCommand{service: service, dispatcher: dispatcher}
}

func (c *CreateUserCommand) Execute(ctx context.Context, req application.CreateUserRequest) (application.CreateUserResponse, error) {
	email, err := domain.NewEmail(req.Email)
	if err != nil {
		return application.CreateUserResponse{}, err
	}
	name, err := domain.NewUserName(req.FirstName, req.LastName)
	if err != nil {
		return application.CreateUserResponse{}, err
	}

	user, err := c.service.CreateUser(ctx, email, name, req.Bio)
	if err != nil {
		return application.CreateUserResponse{}, err
	}

	if c.dispatcher != nil {
		if err := c.dispatcher.DispatchAll(ctx, user.DomainEvents()); err != nil {
			return application.CreateUserResponse{}, err
		}
		user.ClearDomainEvents()
	}

	return application.CreateUserResponse{
		ID:        user.ID,
		Email:     user.Email.String(),
		FullName:  user.Name.FullName(),
		CreatedAt: user.CreatedAt,
	}, nil
}
