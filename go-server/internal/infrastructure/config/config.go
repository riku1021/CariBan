package config

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/joho/godotenv"

	applogger "cariban/go-server/internal/infrastructure/logger"
)

type Config struct {
	Env          string
	LogLevel     string
	Host         string
	Port         int
	ReadTimeout  int
	WriteTimeout int
	DatabaseURL  string
	Security     SecurityHeadersConfig
}

type SecurityHeadersConfig struct {
	EnableHSTS            bool
	HSTSMaxAge            int
	HSTSIncludeSubdomains bool
	CSPPolicy             string
	PermissionsPolicy     string
	XFrameOptions         string
}

func Load() (*Config, error) {
	loadEnvFiles()

	port, err := atoiOrDefault("PORT", 8000)
	if err != nil {
		return nil, err
	}
	readTimeout, err := atoiOrDefault("READ_TIMEOUT", 30)
	if err != nil {
		return nil, err
	}
	writeTimeout, err := atoiOrDefault("WRITE_TIMEOUT", 30)
	if err != nil {
		return nil, err
	}
	hstsMaxAge, err := atoiOrDefault("HSTS_MAX_AGE", 31536000)
	if err != nil {
		return nil, err
	}

	env := getEnvOrDefault("ENV", "dev")
	cfg := &Config{
		Env:          env,
		LogLevel:     applogger.ResolveLevelName(os.Getenv("LOG_LEVEL"), env),
		Host:         getEnvOrDefault("HOST", "0.0.0.0"),
		Port:         port,
		ReadTimeout:  readTimeout,
		WriteTimeout: writeTimeout,
		DatabaseURL:  getEnvOrDefault("DATABASE_URL", "postgres://app:app@localhost:5432/cariban?sslmode=disable"),
		Security: SecurityHeadersConfig{
			EnableHSTS:            parseBool(os.Getenv("ENABLE_HSTS"), false),
			HSTSMaxAge:            hstsMaxAge,
			HSTSIncludeSubdomains: parseBool(getEnvOrDefault("HSTS_INCLUDE_SUBDOMAINS", "true"), true),
			CSPPolicy:             getEnvOrDefault("CSP_POLICY", "default-src 'self'; script-src 'none'; object-src 'none';"),
			PermissionsPolicy:     getEnvOrDefault("PERMISSIONS_POLICY", "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=(), fullscreen=(), autoplay=()"),
			XFrameOptions:         getEnvOrDefault("X_FRAME_OPTIONS", "DENY"),
		},
	}

	return cfg, nil
}

func Addr(cfg *Config) string {
	return fmt.Sprintf("%s:%d", cfg.Host, cfg.Port)
}

func loadEnvFiles() {
	if usesDotenvx() {
		return
	}

	preserved := map[string]string{}
	for _, entry := range os.Environ() {
		key, value, ok := strings.Cut(entry, "=")
		if ok {
			preserved[key] = value
		}
	}

	cwd, err := os.Getwd()
	if err != nil {
		return
	}

	env := strings.ToLower(firstNonEmpty(preserved["ENV"], "dev"))
	candidates := []string{
		filepath.Join(cwd, ".env"),
		filepath.Join(cwd, "envs", ".env"),
		filepath.Join(cwd, "envs", ".env."+env),
	}

	for _, path := range candidates {
		if _, statErr := os.Stat(path); statErr == nil {
			if isDotenvxEncrypted(path) {
				continue
			}
			_ = godotenv.Overload(path)
		}
	}

	for key, value := range preserved {
		_ = os.Setenv(key, value)
	}
}

func usesDotenvx() bool {
	for _, key := range []string{
		"DOTENV_PRIVATE_KEY",
		"DOTENV_PRIVATE_KEY_DEV",
		"DOTENV_PRIVATE_KEY_PROD",
	} {
		if os.Getenv(key) != "" {
			return true
		}
	}
	return false
}

func isDotenvxEncrypted(path string) bool {
	data, err := os.ReadFile(path)
	if err != nil {
		return false
	}
	text := string(data)
	if len(text) > 2000 {
		text = text[:2000]
	}
	return strings.Contains(text, "encrypted:") || strings.Contains(text, "DOTENV_PUBLIC_KEY")
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if value != "" {
			return value
		}
	}
	return ""
}

func getEnvOrDefault(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func atoiOrDefault(key string, fallback int) (int, error) {
	raw := os.Getenv(key)
	if raw == "" {
		return fallback, nil
	}
	value, err := strconv.Atoi(raw)
	if err != nil {
		return 0, fmt.Errorf("invalid %s value: %s", key, raw)
	}
	return value, nil
}

func parseBool(raw string, fallback bool) bool {
	if raw == "" {
		return fallback
	}
	value, err := strconv.ParseBool(raw)
	if err != nil {
		return fallback
	}
	return value
}
