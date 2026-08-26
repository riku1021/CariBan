package middleware

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"cariban/go-server/internal/infrastructure/config"
	"cariban/go-server/internal/infrastructure/logger"
)

type Middleware func(http.Handler) http.Handler

func Chain(handler http.Handler, middlewares ...Middleware) http.Handler {
	for i := len(middlewares) - 1; i >= 0; i-- {
		handler = middlewares[i](handler)
	}
	return handler
}

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (r *statusRecorder) WriteHeader(code int) {
	r.status = code
	r.ResponseWriter.WriteHeader(code)
}

func (r *statusRecorder) Write(b []byte) (int, error) {
	if r.status == 0 {
		r.status = http.StatusOK
	}
	return r.ResponseWriter.Write(b)
}

func ShouldSkipAccessLog(env, path string) bool {
	normalized := path
	if path != "/" {
		normalized = strings.TrimRight(path, "/")
	}
	return strings.EqualFold(env, "prod") && normalized == "/health"
}

func AccessLog(log *logger.Logger, env string) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if ShouldSkipAccessLog(env, r.URL.Path) {
				next.ServeHTTP(w, r)
				return
			}

			start := time.Now()
			rec := &statusRecorder{ResponseWriter: w}
			next.ServeHTTP(rec, r)
			status := rec.status
			if status == 0 {
				status = http.StatusOK
			}
			log.Info("%s %s %d %s", r.Method, r.URL.Path, status, time.Since(start))
		})
	}
}

func SecurityHeaders(cfg config.SecurityHeadersConfig) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("X-Content-Type-Options", "nosniff")
			w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
			w.Header().Set("Content-Security-Policy", cfg.CSPPolicy)
			w.Header().Set("Permissions-Policy", cfg.PermissionsPolicy)
			w.Header().Set("X-Frame-Options", cfg.XFrameOptions)

			if cfg.EnableHSTS {
				value := "max-age=" + strconv.Itoa(cfg.HSTSMaxAge)
				if cfg.HSTSIncludeSubdomains {
					value += "; includeSubDomains"
				}
				w.Header().Set("Strict-Transport-Security", value)
			}

			next.ServeHTTP(w, r)
		})
	}
}
