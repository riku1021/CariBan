package httpx_test

import (
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"cariban/go-server/internal/shared/domain"
	httpx "cariban/go-server/internal/shared/http"
)

func TestHandleErrorMapsDomainErrors(t *testing.T) {
	t.Parallel()

	cases := []struct {
		name   string
		err    error
		status int
	}{
		{name: "validation", err: domain.NewValidationError("X", "bad"), status: http.StatusBadRequest},
		{name: "not found", err: domain.NewNotFoundError("X", "missing"), status: http.StatusNotFound},
		{name: "conflict", err: domain.NewConflictError("X", "dup"), status: http.StatusConflict},
		{name: "unknown", err: errors.New("boom"), status: http.StatusInternalServerError},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			rec := httptest.NewRecorder()
			httpx.HandleError(rec, tc.err)
			if rec.Code != tc.status {
				t.Fatalf("status = %d, want %d", rec.Code, tc.status)
			}
		})
	}
}

func TestHandleErrorHidesOperationDetailsInProd(t *testing.T) {
	t.Setenv("ENV", "prod")

	rec := httptest.NewRecorder()
	httpx.HandleError(rec, domain.NewOperationError("X", "secret internals"))

	if rec.Code != http.StatusInternalServerError {
		t.Fatalf("status = %d, want 500", rec.Code)
	}
	if strings.Contains(rec.Body.String(), "secret internals") {
		t.Fatalf("prod must hide internal details: %s", rec.Body.String())
	}
	if !strings.Contains(rec.Body.String(), "内部エラーが発生しました") {
		t.Fatalf("prod should return generic message: %s", rec.Body.String())
	}
}

func TestHandleErrorShowsOperationDetailsOutsideProd(t *testing.T) {
	t.Setenv("ENV", "dev")

	rec := httptest.NewRecorder()
	httpx.HandleError(rec, domain.NewOperationError("X", "secret internals"))

	if !strings.Contains(rec.Body.String(), "secret internals") {
		t.Fatalf("dev should keep operation details: %s", rec.Body.String())
	}
}
