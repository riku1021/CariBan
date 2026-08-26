package queries

import (
	"context"

	"cariban/go-server/internal/modules/user/application"
	"cariban/go-server/internal/modules/user/domain"
)

type ListUsersQuery struct {
	repository domain.UserRepository
}

func NewListUsersQuery(repository domain.UserRepository) *ListUsersQuery {
	return &ListUsersQuery{repository: repository}
}

func (q *ListUsersQuery) Execute(ctx context.Context, req application.ListUsersRequest) (application.ListUsersResponse, error) {
	limit := req.Limit
	if limit <= 0 {
		limit = 10
	}
	offset := req.Offset
	if offset < 0 {
		offset = 0
	}

	users, total, err := q.repository.FindAll(ctx, limit, offset)
	if err != nil {
		return application.ListUsersResponse{}, err
	}

	items := make([]application.UserItem, 0, len(users))
	for _, user := range users {
		items = append(items, application.UserItem{
			ID:        user.ID,
			Email:     user.Email.String(),
			FullName:  user.Name.FullName(),
			Status:    string(user.Status),
			CreatedAt: user.CreatedAt,
		})
	}

	return application.ListUsersResponse{
		Items:  items,
		Total:  total,
		Limit:  limit,
		Offset: offset,
	}, nil
}
