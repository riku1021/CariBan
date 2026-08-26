package commands

import (
	"context"

	"cariban/go-server/internal/modules/user/domain"
	"cariban/go-server/internal/shared/events"
)

type DeactivateUserCommand struct {
	service    *domain.UserDomainService
	dispatcher events.Dispatcher
}

func NewDeactivateUserCommand(service *domain.UserDomainService, dispatcher events.Dispatcher) *DeactivateUserCommand {
	return &DeactivateUserCommand{service: service, dispatcher: dispatcher}
}

func (c *DeactivateUserCommand) Execute(ctx context.Context, userID string, reason *string) error {
	user, err := c.service.DeactivateUser(ctx, userID, reason)
	if err != nil {
		return err
	}
	if c.dispatcher != nil {
		if err := c.dispatcher.DispatchAll(ctx, user.DomainEvents()); err != nil {
			return err
		}
		user.ClearDomainEvents()
	}
	return nil
}
