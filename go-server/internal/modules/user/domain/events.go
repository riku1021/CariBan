package domain

import (
	shared "cariban/go-server/internal/shared/domain"
	"time"
)

type UserCreatedEvent struct {
	shared.BaseEvent
	UserID   string
	Email    string
	FullName string
}

func NewUserCreatedEvent(userID, email, fullName string) UserCreatedEvent {
	return UserCreatedEvent{
		BaseEvent: shared.NewBaseEvent("UserCreatedEvent"),
		UserID:    userID,
		Email:     email,
		FullName:  fullName,
	}
}

type UserProfileUpdatedEvent struct {
	shared.BaseEvent
	UserID    string
	Bio       *string
	AvatarURL *string
	UpdatedAt time.Time
}

func NewUserProfileUpdatedEvent(userID string, bio, avatarURL *string, updatedAt time.Time) UserProfileUpdatedEvent {
	return UserProfileUpdatedEvent{
		BaseEvent: shared.NewBaseEvent("UserProfileUpdatedEvent"),
		UserID:    userID,
		Bio:       bio,
		AvatarURL: avatarURL,
		UpdatedAt: updatedAt,
	}
}

type UserDeactivatedEvent struct {
	shared.BaseEvent
	UserID        string
	Reason        *string
	DeactivatedAt time.Time
}

func NewUserDeactivatedEvent(userID string, reason *string, deactivatedAt time.Time) UserDeactivatedEvent {
	return UserDeactivatedEvent{
		BaseEvent:     shared.NewBaseEvent("UserDeactivatedEvent"),
		UserID:        userID,
		Reason:        reason,
		DeactivatedAt: deactivatedAt,
	}
}
