package domain

import (
	"time"

	shared "cariban/go-server/internal/shared/domain"
)

type UserStatus string

const (
	UserStatusActive    UserStatus = "active"
	UserStatusInactive  UserStatus = "inactive"
	UserStatusSuspended UserStatus = "suspended"
)

type User struct {
	shared.AggregateRoot
	Email   Email
	Name    UserName
	Status  UserStatus
	Profile *UserProfile
}

func CreateUser(email Email, name UserName, bio *string) (*User, error) {
	var profile *UserProfile
	var err error
	if bio != nil {
		profile, err = CreateProfile(bio)
		if err != nil {
			return nil, err
		}
	} else {
		profile = CreateEmptyProfile()
	}

	user := &User{
		AggregateRoot: shared.NewAggregateRoot(),
		Email:         email,
		Name:          name,
		Status:        UserStatusActive,
		Profile:       profile,
	}
	user.AddDomainEvent(NewUserCreatedEvent("", email.String(), name.FullName()))
	return user, nil
}

func ReconstructUser(
	id string,
	email Email,
	name UserName,
	status UserStatus,
	profile *UserProfile,
	createdAt, updatedAt time.Time,
) *User {
	return &User{
		AggregateRoot: shared.ReconstructAggregateRoot(id, createdAt, updatedAt),
		Email:         email,
		Name:          name,
		Status:        status,
		Profile:       profile,
	}
}

func (u *User) UpdateProfile(bio, avatarURL, website, location *string) error {
	if err := u.ensureActive(); err != nil {
		return err
	}
	if u.Profile == nil {
		return UserProfileNotFoundError(u.ID)
	}
	if err := u.Profile.Update(bio, avatarURL, website, location); err != nil {
		return err
	}
	u.Touch()
	u.AddDomainEvent(NewUserProfileUpdatedEvent(u.ID, bio, avatarURL, u.UpdatedAt))
	return nil
}

func (u *User) Deactivate(reason *string) {
	u.Status = UserStatusInactive
	u.Touch()
	u.AddDomainEvent(NewUserDeactivatedEvent(u.ID, reason, u.UpdatedAt))
}

func (u *User) IsActive() bool {
	return u.Status == UserStatusActive
}

func (u *User) ensureActive() error {
	if u.Status != UserStatusActive {
		return UserValidationError("ユーザーはアクティブではありません（ステータス: " + string(u.Status) + "）")
	}
	return nil
}
