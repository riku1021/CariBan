package logger_test

import (
	"bytes"
	"log/slog"
	"strings"
	"testing"

	"cariban/go-server/internal/infrastructure/logger"
)

func TestResolveLevelName(t *testing.T) {
	t.Parallel()

	cases := []struct {
		logLevel string
		env      string
		want     string
	}{
		{logLevel: "", env: "dev", want: "DEBUG"},
		{logLevel: "", env: "prod", want: "INFO"},
		{logLevel: "ERROR", env: "prod", want: "ERROR"},
		{logLevel: "warn", env: "dev", want: "WARN"},
		{logLevel: "WARNING", env: "dev", want: "DEBUG"},
		{logLevel: "CRITICAL", env: "prod", want: "INFO"},
		{logLevel: "encrypted:abc", env: "prod", want: "INFO"},
	}

	for _, tc := range cases {
		t.Run(tc.env+"/"+tc.logLevel, func(t *testing.T) {
			t.Parallel()
			got := logger.ResolveLevelName(tc.logLevel, tc.env)
			if got != tc.want {
				t.Fatalf("ResolveLevelName(%q, %q) = %q, want %q", tc.logLevel, tc.env, got, tc.want)
			}
		})
	}
}

func TestParseLevel(t *testing.T) {
	t.Parallel()

	if logger.ParseLevel("DEBUG") != slog.LevelDebug {
		t.Fatal("DEBUG should map to slog.LevelDebug")
	}
	if logger.ParseLevel("WARN") != slog.LevelWarn {
		t.Fatal("WARN should map to slog.LevelWarn")
	}
}

func TestLoggerRespectsLevel(t *testing.T) {
	t.Parallel()

	var buf bytes.Buffer
	log := logger.NewWithWriter("INFO", &buf)
	log.Debug("hidden")
	log.Info("visible")

	out := buf.String()
	if strings.Contains(out, "hidden") {
		t.Fatalf("DEBUG should be filtered at INFO: %s", out)
	}
	if !strings.Contains(out, "visible") {
		t.Fatalf("INFO should be emitted: %s", out)
	}
}
