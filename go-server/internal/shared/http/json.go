package httpx

import (
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"strings"

	"cariban/go-server/internal/shared/domain"
)

type errorBody struct {
	Error errorDetail `json:"error"`
}

type errorDetail struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Type    string `json:"type"`
}

func WriteJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if payload == nil {
		return
	}
	_ = json.NewEncoder(w).Encode(payload)
}

func DecodeJSON(r *http.Request, dest any) error {
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(dest); err != nil {
		return domain.NewValidationError("INVALID_JSON", "リクエストボディが不正です")
	}
	return nil
}

func HandleError(w http.ResponseWriter, err error) {
	var domainErr *domain.Error
	if errors.As(err, &domainErr) {
		message := domainErr.Message
		if domainErr.Kind.HTTPStatus() >= http.StatusInternalServerError && isProduction() {
			message = "内部エラーが発生しました"
		}
		WriteJSON(w, domainErr.Kind.HTTPStatus(), errorBody{
			Error: errorDetail{
				Code:    domainErr.Code,
				Message: message,
				Type:    domainErr.Kind.TypeName(),
			},
		})
		return
	}

	WriteJSON(w, http.StatusInternalServerError, errorBody{
		Error: errorDetail{
			Code:    "INTERNAL_ERROR",
			Message: "内部エラーが発生しました",
			Type:    "operation_error",
		},
	})
}

func isProduction() bool {
	return strings.EqualFold(os.Getenv("ENV"), "prod")
}
