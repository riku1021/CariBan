package domain_test

import (
	"testing"

	"cariban/go-server/internal/modules/user/domain"
)

func TestNewEmail(t *testing.T) {
	t.Parallel()

	email, err := domain.NewEmail("User@Example.com")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if email.String() != "user@example.com" {
		t.Fatalf("got %q", email.String())
	}

	if _, err := domain.NewEmail("not-an-email"); err == nil {
		t.Fatal("expected validation error")
	}
}

func TestNewUserName(t *testing.T) {
	t.Parallel()

	name, err := domain.NewUserName("太郎", "山田")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if name.FullName() != "山田 太郎" {
		t.Fatalf("got %q", name.FullName())
	}
}
