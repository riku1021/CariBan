package middleware_test

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"cariban/go-server/internal/infrastructure/logger"
	"cariban/go-server/internal/infrastructure/middleware"
)

func TestShouldSkipAccessLog(t *testing.T) {
	t.Parallel()

	if !middleware.ShouldSkipAccessLog("prod", "/health") {
		t.Fatal("prod /health should be skipped")
	}
	if !middleware.ShouldSkipAccessLog("prod", "/health/") {
		t.Fatal("prod /health/ should be skipped")
	}
	if middleware.ShouldSkipAccessLog("dev", "/health") {
		t.Fatal("dev /health should be logged")
	}
	if middleware.ShouldSkipAccessLog("prod", "/api/users") {
		t.Fatal("prod non-health should be logged")
	}
}

func TestAccessLogWritesSingleLine(t *testing.T) {
	t.Parallel()

	var buf strings.Builder
	log := logger.NewWithWriter("INFO", &buf)
	handler := middleware.AccessLog(log, "dev")(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusCreated)
		_, _ = w.Write([]byte("ok"))
	}))

	req := httptest.NewRequest(http.MethodPost, "/api/users", nil)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)

	out := buf.String()
	if strings.Count(out, "POST /api/users") != 1 {
		t.Fatalf("expected one access log line, got %q", out)
	}
	if !strings.Contains(out, "201") {
		t.Fatalf("expected status 201 in %q", out)
	}
}

func TestAccessLogSkipsHealthInProd(t *testing.T) {
	t.Parallel()

	var buf strings.Builder
	log := logger.NewWithWriter("INFO", &buf)
	handler := middleware.AccessLog(log, "prod")(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)

	if buf.Len() != 0 {
		t.Fatalf("prod /health should not be logged, got %q", buf.String())
	}
}
