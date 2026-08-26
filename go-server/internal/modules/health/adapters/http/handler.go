package healthhttp

import (
	"net/http"
	"time"

	"cariban/go-server/internal/modules/health/application"
	httpx "cariban/go-server/internal/shared/http"
)

type Handler struct {
	usecase *application.HealthCheckUseCase
}

func NewHandler(usecase *application.HealthCheckUseCase) *Handler {
	return &Handler{usecase: usecase}
}

type healthResponse struct {
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
}

func (h *Handler) HealthCheck(w http.ResponseWriter, _ *http.Request) {
	status := h.usecase.Execute()
	httpx.WriteJSON(w, http.StatusOK, healthResponse{
		Status:    status.Status,
		Timestamp: status.Timestamp.Format(time.RFC3339),
	})
}

func (h *Handler) Register(mux *http.ServeMux) {
	mux.HandleFunc("GET /health", h.HealthCheck)
}
