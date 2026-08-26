package logger

import (
	"fmt"
	"io"
	"log/slog"
	"os"
	"strings"
)

type Logger struct {
	inner *slog.Logger
}

func New(levelName string) *Logger {
	return NewWithWriter(levelName, os.Stdout)
}

func NewWithWriter(levelName string, w io.Writer) *Logger {
	handler := slog.NewTextHandler(w, &slog.HandlerOptions{Level: ParseLevel(levelName)})
	return &Logger{inner: slog.New(handler)}
}

func DefaultLevelName(env string) string {
	if strings.EqualFold(env, "prod") {
		return "INFO"
	}
	return "DEBUG"
}

func ResolveLevelName(logLevel, env string) string {
	switch strings.ToUpper(strings.TrimSpace(logLevel)) {
	case "DEBUG":
		return "DEBUG"
	case "INFO":
		return "INFO"
	case "WARN":
		return "WARN"
	case "ERROR":
		return "ERROR"
	default:
		return DefaultLevelName(env)
	}
}

func ParseLevel(name string) slog.Level {
	switch ResolveLevelName(name, "") {
	case "DEBUG":
		return slog.LevelDebug
	case "WARN":
		return slog.LevelWarn
	case "ERROR":
		return slog.LevelError
	default:
		return slog.LevelInfo
	}
}

func (l *Logger) Debug(format string, v ...any) {
	l.inner.Debug(fmt.Sprintf(format, v...))
}

func (l *Logger) Info(format string, v ...any) {
	l.inner.Info(fmt.Sprintf(format, v...))
}

func (l *Logger) Warn(format string, v ...any) {
	l.inner.Warn(fmt.Sprintf(format, v...))
}

func (l *Logger) Error(format string, v ...any) {
	l.inner.Error(fmt.Sprintf(format, v...))
}
