package domain

import (
	"context"
	"errors"

	shared "cariban/go-server/internal/shared/domain"
)

type UserDomainService struct {
	repository UserRepository
}

func NewUserDomainService(repository UserRepository) *UserDomainService {
	return &UserDomainService{repository: repository}
}

func (s *UserDomainService) IsEmailAvailable(ctx context.Context, email Email, excludeUserID string) (bool, error) {
	existing, err := s.repository.FindByEmail(ctx, email)
	if err != nil {
		return false, err
	}
	if existing == nil {
		return true, nil
	}
	return excludeUserID != "" && existing.ID == excludeUserID, nil
}

func (s *UserDomainService) CreateUser(ctx context.Context, email Email, name UserName, bio *string) (*User, error) {
	available, err := s.IsEmailAvailable(ctx, email, "")
	if err != nil {
		return nil, err
	}
	if !available {
		return nil, DuplicateEmailError(email.String())
	}

	user, err := CreateUser(email, name, bio)
	if err != nil {
		return nil, err
	}
	return s.repository.Create(ctx, user)
}

func (s *UserDomainService) DeactivateUser(ctx context.Context, userID string, reason *string) (*User, error) {
	user, err := s.repository.FindByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	user.Deactivate(reason)
	if err := s.repository.Update(ctx, user); err != nil {
		return nil, err
	}
	return user, nil
}

func IsNotFound(err error) bool {
	var domainErr *shared.Error
	return errors.As(err, &domainErr) && domainErr.Kind == shared.KindNotFound
}
