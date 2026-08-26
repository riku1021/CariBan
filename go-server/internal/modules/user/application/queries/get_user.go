package queries

import (
	"context"

	"cariban/go-server/internal/modules/user/application"
	"cariban/go-server/internal/modules/user/domain"
)

type GetUserQuery struct {
	repository domain.UserRepository
}

func NewGetUserQuery(repository domain.UserRepository) *GetUserQuery {
	return &GetUserQuery{repository: repository}
}

func (q *GetUserQuery) Execute(ctx context.Context, userID string) (application.GetUserResponse, error) {
	user, err := q.repository.FindByID(ctx, userID)
	if err != nil {
		return application.GetUserResponse{}, err
	}

	var profile *application.UserProfileResponse
	if user.Profile != nil {
		profile = &application.UserProfileResponse{
			Bio:       user.Profile.Bio,
			AvatarURL: user.Profile.AvatarURL,
			Website:   user.Profile.Website,
			Location:  user.Profile.Location,
		}
	}

	return application.GetUserResponse{
		ID:        user.ID,
		Email:     user.Email.String(),
		FirstName: user.Name.FirstName,
		LastName:  user.Name.LastName,
		FullName:  user.Name.FullName(),
		Status:    string(user.Status),
		Profile:   profile,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}, nil
}
