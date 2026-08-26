package userhttp

import (
	"net/http"
	"strconv"
	"time"

	"cariban/go-server/internal/modules/user/application"
	"cariban/go-server/internal/modules/user/application/commands"
	"cariban/go-server/internal/modules/user/application/queries"
	httpx "cariban/go-server/internal/shared/http"
)

type Handler struct {
	create     *commands.CreateUserCommand
	update     *commands.UpdateUserProfileCommand
	deactivate *commands.DeactivateUserCommand
	get        *queries.GetUserQuery
	list       *queries.ListUsersQuery
}

func NewHandler(
	create *commands.CreateUserCommand,
	update *commands.UpdateUserProfileCommand,
	deactivate *commands.DeactivateUserCommand,
	get *queries.GetUserQuery,
	list *queries.ListUsersQuery,
) *Handler {
	return &Handler{
		create:     create,
		update:     update,
		deactivate: deactivate,
		get:        get,
		list:       list,
	}
}

type createUserRequest struct {
	Email     string  `json:"email"`
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	Bio       *string `json:"bio"`
}

type createUserResponse struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	FullName  string `json:"full_name"`
	CreatedAt string `json:"created_at"`
}

type updateProfileRequest struct {
	Bio       *string `json:"bio"`
	AvatarURL *string `json:"avatar_url"`
	Website   *string `json:"website"`
	Location  *string `json:"location"`
}

type updateProfileResponse struct {
	UserID    string `json:"user_id"`
	UpdatedAt string `json:"updated_at"`
}

type userProfileResponse struct {
	Bio       *string `json:"bio"`
	AvatarURL *string `json:"avatar_url"`
	Website   *string `json:"website"`
	Location  *string `json:"location"`
}

type userResponse struct {
	ID        string               `json:"id"`
	Email     string               `json:"email"`
	FirstName string               `json:"first_name"`
	LastName  string               `json:"last_name"`
	FullName  string               `json:"full_name"`
	Status    string               `json:"status"`
	Profile   *userProfileResponse `json:"profile"`
	CreatedAt string               `json:"created_at"`
	UpdatedAt string               `json:"updated_at"`
}

type userItem struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	FullName  string `json:"full_name"`
	Status    string `json:"status"`
	CreatedAt string `json:"created_at"`
}

type listUsersResponse struct {
	Items  []userItem `json:"items"`
	Total  int        `json:"total"`
	Limit  int        `json:"limit"`
	Offset int        `json:"offset"`
}

func (h *Handler) Register(mux *http.ServeMux) {
	mux.HandleFunc("GET /api/users", h.List)
	mux.HandleFunc("POST /api/users", h.Create)
	mux.HandleFunc("GET /api/users/{id}", h.Get)
	mux.HandleFunc("PUT /api/users/{id}/profile", h.UpdateProfile)
	mux.HandleFunc("DELETE /api/users/{id}", h.Deactivate)
}

func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	limit, offset := parsePagination(r)
	resp, err := h.list.Execute(r.Context(), application.ListUsersRequest{Limit: limit, Offset: offset})
	if err != nil {
		httpx.HandleError(w, err)
		return
	}

	items := make([]userItem, 0, len(resp.Items))
	for _, item := range resp.Items {
		items = append(items, userItem{
			ID:        item.ID,
			Email:     item.Email,
			FullName:  item.FullName,
			Status:    item.Status,
			CreatedAt: item.CreatedAt.Format(time.RFC3339),
		})
	}

	httpx.WriteJSON(w, http.StatusOK, listUsersResponse{
		Items:  items,
		Total:  resp.Total,
		Limit:  resp.Limit,
		Offset: resp.Offset,
	})
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	var req createUserRequest
	if err := httpx.DecodeJSON(r, &req); err != nil {
		httpx.HandleError(w, err)
		return
	}

	resp, err := h.create.Execute(r.Context(), application.CreateUserRequest{
		Email:     req.Email,
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Bio:       req.Bio,
	})
	if err != nil {
		httpx.HandleError(w, err)
		return
	}

	httpx.WriteJSON(w, http.StatusCreated, createUserResponse{
		ID:        resp.ID,
		Email:     resp.Email,
		FullName:  resp.FullName,
		CreatedAt: resp.CreatedAt.Format(time.RFC3339),
	})
}

func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	resp, err := h.get.Execute(r.Context(), r.PathValue("id"))
	if err != nil {
		httpx.HandleError(w, err)
		return
	}

	var profile *userProfileResponse
	if resp.Profile != nil {
		profile = &userProfileResponse{
			Bio:       resp.Profile.Bio,
			AvatarURL: resp.Profile.AvatarURL,
			Website:   resp.Profile.Website,
			Location:  resp.Profile.Location,
		}
	}

	httpx.WriteJSON(w, http.StatusOK, userResponse{
		ID:        resp.ID,
		Email:     resp.Email,
		FirstName: resp.FirstName,
		LastName:  resp.LastName,
		FullName:  resp.FullName,
		Status:    resp.Status,
		Profile:   profile,
		CreatedAt: resp.CreatedAt.Format(time.RFC3339),
		UpdatedAt: resp.UpdatedAt.Format(time.RFC3339),
	})
}

func (h *Handler) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	var req updateProfileRequest
	if err := httpx.DecodeJSON(r, &req); err != nil {
		httpx.HandleError(w, err)
		return
	}

	resp, err := h.update.Execute(r.Context(), application.UpdateUserProfileRequest{
		UserID:    r.PathValue("id"),
		Bio:       req.Bio,
		AvatarURL: req.AvatarURL,
		Website:   req.Website,
		Location:  req.Location,
	})
	if err != nil {
		httpx.HandleError(w, err)
		return
	}

	httpx.WriteJSON(w, http.StatusOK, updateProfileResponse{
		UserID:    resp.UserID,
		UpdatedAt: resp.UpdatedAt.Format(time.RFC3339),
	})
}

func (h *Handler) Deactivate(w http.ResponseWriter, r *http.Request) {
	if err := h.deactivate.Execute(r.Context(), r.PathValue("id"), nil); err != nil {
		httpx.HandleError(w, err)
		return
	}
	w.WriteHeader(http.StatusNoContent)
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
