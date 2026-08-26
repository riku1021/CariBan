package healthhttp_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	healthhttp "cariban/go-server/internal/modules/health/adapters/http"
	"cariban/go-server/internal/modules/health/application"
)

func TestHealthCheck(t *testing.T) {
	t.Parallel()

	mux := http.NewServeMux()
	healthhttp.NewHandler(application.NewHealthCheckUseCase()).Register(mux)

	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	var body struct {
		Status    string `json:"status"`
		Timestamp string `json:"timestamp"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if body.Status != "healthy" {
		t.Fatalf("status = %q, want healthy", body.Status)
	}
	if body.Timestamp == "" {
		t.Fatal("timestamp is empty")
	}
}
