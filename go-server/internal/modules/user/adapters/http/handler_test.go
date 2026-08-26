package userhttp_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	userrepo "cariban/go-server/internal/adapter/repository/user"
	userhttp "cariban/go-server/internal/modules/user/adapters/http"
	usercmd "cariban/go-server/internal/modules/user/application/commands"
	userquery "cariban/go-server/internal/modules/user/application/queries"
	userdomain "cariban/go-server/internal/modules/user/domain"
	"cariban/go-server/internal/shared/events"
)

func newUserMux() *http.ServeMux {
	repo := userrepo.NewInMemoryRepository()
	service := userdomain.NewUserDomainService(repo)
	dispatcher := events.NewNopDispatcher()
	handler := userhttp.NewHandler(
		usercmd.NewCreateUserCommand(service, dispatcher),
		usercmd.NewUpdateUserProfileCommand(repo, dispatcher),
		usercmd.NewDeactivateUserCommand(service, dispatcher),
		userquery.NewGetUserQuery(repo),
		userquery.NewListUsersQuery(repo),
	)
	mux := http.NewServeMux()
	handler.Register(mux)
	return mux
}

func TestCreateAndGetUser(t *testing.T) {
	t.Parallel()

	mux := newUserMux()
	createReq := httptest.NewRequest(http.MethodPost, "/api/users", bytes.NewBufferString(`{"email":"user@example.com","first_name":"太郎","last_name":"山田"}`))
	createReq.Header.Set("Content-Type", "application/json")
	createRec := httptest.NewRecorder()
	mux.ServeHTTP(createRec, createReq)
	if createRec.Code != http.StatusCreated {
		t.Fatalf("create status = %d body=%s", createRec.Code, createRec.Body.String())
	}

	var created struct {
		ID       string `json:"id"`
		FullName string `json:"full_name"`
	}
	if err := json.NewDecoder(createRec.Body).Decode(&created); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if created.FullName != "山田 太郎" {
		t.Fatalf("full_name = %q", created.FullName)
	}

	getReq := httptest.NewRequest(http.MethodGet, "/api/users/"+created.ID, nil)
	getRec := httptest.NewRecorder()
	mux.ServeHTTP(getRec, getReq)
	if getRec.Code != http.StatusOK {
		t.Fatalf("get status = %d", getRec.Code)
	}
}

func TestDuplicateEmail(t *testing.T) {
	t.Parallel()

	mux := newUserMux()
	body := `{"email":"dup@example.com","first_name":"A","last_name":"B"}`
	first := httptest.NewRequest(http.MethodPost, "/api/users", bytes.NewBufferString(body))
	first.Header.Set("Content-Type", "application/json")
	firstRec := httptest.NewRecorder()
	mux.ServeHTTP(firstRec, first)
	if firstRec.Code != http.StatusCreated {
		t.Fatalf("first create status = %d", firstRec.Code)
	}

	second := httptest.NewRequest(http.MethodPost, "/api/users", bytes.NewBufferString(body))
	second.Header.Set("Content-Type", "application/json")
	secondRec := httptest.NewRecorder()
	mux.ServeHTTP(secondRec, second)
	if secondRec.Code != http.StatusConflict {
		t.Fatalf("second create status = %d, want 409", secondRec.Code)
	}
}
