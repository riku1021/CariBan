package commands

import (
	"context"

	"cariban/go-server/internal/modules/user/application"
	"cariban/go-server/internal/modules/user/domain"
	"cariban/go-server/internal/shared/events"
)

type UpdateUserProfileCommand struct {
	repository domain.UserRepository
	dispatcher events.Dispatcher
}

func NewUpdateUserProfileCommand(repository domain.UserRepository, dispatcher events.Dispatcher) *UpdateUserProfileCommand {
	return &UpdateUserProfileCommand{repository: repository, dispatcher: dispatcher}
}

func (c *UpdateUserProfileCommand) Execute(ctx context.Context, req application.UpdateUserProfileRequest) (application.UpdateUserProfileResponse, error) {
	user, err := c.repository.FindByID(ctx, req.UserID)
	if err != nil {
		return application.UpdateUserProfileResponse{}, err
	}

	if err := user.UpdateProfile(req.Bio, req.AvatarURL, req.Website, req.Location); err != nil {
		return application.UpdateUserProfileResponse{}, err
	}

	if err := c.repository.Update(ctx, user); err != nil {
		return application.UpdateUserProfileResponse{}, err
	}

	if c.dispatcher != nil {
		if err := c.dispatcher.DispatchAll(ctx, user.DomainEvents()); err != nil {
			return application.UpdateUserProfileResponse{}, err
		}
		user.ClearDomainEvents()
	}

	return application.UpdateUserProfileResponse{
		UserID:    user.ID,
		UpdatedAt: user.UpdatedAt,
	}, nil
}
