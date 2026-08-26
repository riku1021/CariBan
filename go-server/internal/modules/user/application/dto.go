package application

import "time"

type CreateUserRequest struct {
	Email     string
	FirstName string
	LastName  string
	Bio       *string
}

type CreateUserResponse struct {
	ID        string
	Email     string
	FullName  string
	CreatedAt time.Time
}

type UpdateUserProfileRequest struct {
	UserID    string
	Bio       *string
	AvatarURL *string
	Website   *string
	Location  *string
}

type UpdateUserProfileResponse struct {
	UserID    string
	UpdatedAt time.Time
}

type UserProfileResponse struct {
	Bio       *string
	AvatarURL *string
	Website   *string
	Location  *string
}

type GetUserResponse struct {
	ID        string
	Email     string
	FirstName string
	LastName  string
	FullName  string
	Status    string
	Profile   *UserProfileResponse
	CreatedAt time.Time
	UpdatedAt time.Time
}

type ListUsersRequest struct {
	Limit  int
	Offset int
}

type UserItem struct {
	ID        string
	Email     string
	FullName  string
	Status    string
	CreatedAt time.Time
}

type ListUsersResponse struct {
	Items  []UserItem
	Total  int
	Limit  int
	Offset int
}
