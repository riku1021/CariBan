package domain_test

import (
	"testing"

	"cariban/go-server/internal/modules/sample/domain"
)

func TestNewSampleName(t *testing.T) {
	t.Parallel()

	name, err := domain.NewSampleName("  hello  ")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if name.String() != "hello" {
		t.Fatalf("got %q, want hello", name.String())
	}

	if _, err := domain.NewSampleName("   "); err == nil {
		t.Fatal("expected validation error")
	}
}
