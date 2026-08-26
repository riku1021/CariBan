package samplehttp

import (
	"net/http"
	"strconv"
	"time"

	"cariban/go-server/internal/modules/sample/application"
	"cariban/go-server/internal/modules/sample/application/commands"
	"cariban/go-server/internal/modules/sample/application/queries"
	httpx "cariban/go-server/internal/shared/http"
)

type Handler struct {
	create *commands.CreateSampleCommand
	get    *queries.GetSampleQuery
	list   *queries.ListSamplesQuery
}

func NewHandler(
	create *commands.CreateSampleCommand,
	get *queries.GetSampleQuery,
	list *queries.ListSamplesQuery,
) *Handler {
	return &Handler{create: create, get: get, list: list}
}

type createSampleRequest struct {
	Name        string  `json:"name"`
	Description *string `json:"description"`
}

type createSampleResponse struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
}

type sampleResponse struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description"`
	CreatedAt   string  `json:"created_at"`
	UpdatedAt   string  `json:"updated_at"`
}

type sampleItem struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
}

type listSamplesResponse struct {
	Items  []sampleItem `json:"items"`
	Total  int          `json:"total"`
	Limit  int          `json:"limit"`
	Offset int          `json:"offset"`
}

func (h *Handler) Register(mux *http.ServeMux) {
	mux.HandleFunc("GET /api/samples", h.List)
	mux.HandleFunc("POST /api/samples", h.Create)
	mux.HandleFunc("GET /api/samples/{id}", h.Get)
}

func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	limit, offset := parsePagination(r)
	resp, err := h.list.Execute(r.Context(), application.ListSamplesRequest{Limit: limit, Offset: offset})
	if err != nil {
		httpx.HandleError(w, err)
		return
	}

	items := make([]sampleItem, 0, len(resp.Items))
	for _, item := range resp.Items {
		items = append(items, sampleItem{
			ID:        item.ID,
			Name:      item.Name,
			CreatedAt: item.CreatedAt.Format(time.RFC3339),
		})
	}

	httpx.WriteJSON(w, http.StatusOK, listSamplesResponse{
		Items:  items,
		Total:  resp.Total,
		Limit:  resp.Limit,
		Offset: resp.Offset,
	})
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	var req createSampleRequest
	if err := httpx.DecodeJSON(r, &req); err != nil {
		httpx.HandleError(w, err)
		return
	}

	resp, err := h.create.Execute(r.Context(), application.CreateSampleRequest{
		Name:        req.Name,
		Description: req.Description,
	})
	if err != nil {
		httpx.HandleError(w, err)
		return
	}

	httpx.WriteJSON(w, http.StatusCreated, createSampleResponse{
		ID:        resp.ID,
		Name:      resp.Name,
		CreatedAt: resp.CreatedAt.Format(time.RFC3339),
	})
}

func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	resp, err := h.get.Execute(r.Context(), id)
	if err != nil {
		httpx.HandleError(w, err)
		return
	}

	httpx.WriteJSON(w, http.StatusOK, sampleResponse{
		ID:          resp.ID,
		Name:        resp.Name,
		Description: resp.Description,
		CreatedAt:   resp.CreatedAt.Format(time.RFC3339),
		UpdatedAt:   resp.UpdatedAt.Format(time.RFC3339),
	})
}

func parsePagination(r *http.Request) (int, int) {
	limit := 10
	offset := 0
	if raw := r.URL.Query().Get("limit"); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil && parsed > 0 {
			limit = parsed
		}
	}
	if raw := r.URL.Query().Get("offset"); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil && parsed >= 0 {
			offset = parsed
		}
	}
	return limit, offset
}
