package user

import (
	"context"
	"sync"

	"github.com/google/uuid"

	"cariban/go-server/internal/modules/user/domain"
)

type InMemoryRepository struct {
	mu         sync.RWMutex
	users      map[string]*domain.User
	emailIndex map[string]string
}

func NewInMemoryRepository() *InMemoryRepository {
	return &InMemoryRepository{
		users:      make(map[string]*domain.User),
		emailIndex: make(map[string]string),
	}
}

func (r *InMemoryRepository) Create(_ context.Context, user *domain.User) (*domain.User, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	email := user.Email.String()
	if _, ok := r.emailIndex[email]; ok {
		return nil, domain.DuplicateEmailError(email)
	}

	userID := uuid.NewString()
	user.SetID(userID)
	r.users[userID] = copyUser(user)
	r.emailIndex[email] = userID
	return user, nil
}

func (r *InMemoryRepository) FindByID(_ context.Context, id string) (*domain.User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	stored, ok := r.users[id]
	if !ok {
		return nil, domain.UserNotFoundError(id)
	}
	return copyUser(stored), nil
}

func (r *InMemoryRepository) FindByEmail(_ context.Context, email domain.Email) (*domain.User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	userID, ok := r.emailIndex[email.String()]
	if !ok {
		return nil, nil
	}
	return copyUser(r.users[userID]), nil
}

func (r *InMemoryRepository) FindAll(_ context.Context, limit, offset int) ([]*domain.User, int, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	all := make([]*domain.User, 0, len(r.users))
	for _, user := range r.users {
		all = append(all, copyUser(user))
	}
	total := len(all)
	if offset > total {
		return []*domain.User{}, total, nil
	}
	end := offset + limit
	if end > total {
		end = total
	}
	return all[offset:end], total, nil
}

func (r *InMemoryRepository) Update(_ context.Context, user *domain.User) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	stored, ok := r.users[user.ID]
	if !ok {
		return domain.UserNotFoundError(user.ID)
	}

	oldEmail := stored.Email.String()
	newEmail := user.Email.String()
	if oldEmail != newEmail {
		if existingID, exists := r.emailIndex[newEmail]; exists && existingID != user.ID {
			return domain.DuplicateEmailError(newEmail)
		}
		delete(r.emailIndex, oldEmail)
		r.emailIndex[newEmail] = user.ID
	}

	r.users[user.ID] = copyUser(user)
	return nil
}

func (r *InMemoryRepository) Delete(_ context.Context, id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	stored, ok := r.users[id]
	if !ok {
		return domain.UserNotFoundError(id)
	}
	delete(r.emailIndex, stored.Email.String())
	delete(r.users, id)
	return nil
}

func (r *InMemoryRepository) ExistsByEmail(_ context.Context, email domain.Email) (bool, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	_, ok := r.emailIndex[email.String()]
	return ok, nil
}

func copyUser(user *domain.User) *domain.User {
	var profile *domain.UserProfile
	if user.Profile != nil {
		copied := *user.Profile
		if user.Profile.Bio != nil {
			value := *user.Profile.Bio
			copied.Bio = &value
		}
		if user.Profile.AvatarURL != nil {
			value := *user.Profile.AvatarURL
			copied.AvatarURL = &value
		}
		if user.Profile.Website != nil {
			value := *user.Profile.Website
			copied.Website = &value
		}
		if user.Profile.Location != nil {
			value := *user.Profile.Location
			copied.Location = &value
		}
		profile = &copied
	}
	return domain.ReconstructUser(user.ID, user.Email, user.Name, user.Status, profile, user.CreatedAt, user.UpdatedAt)
}
