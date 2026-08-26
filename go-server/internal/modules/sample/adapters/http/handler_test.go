package samplehttp_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	samplerepo "cariban/go-server/internal/adapter/repository/sample"
	samplehttp "cariban/go-server/internal/modules/sample/adapters/http"
	samplecmd "cariban/go-server/internal/modules/sample/application/commands"
	samplequery "cariban/go-server/internal/modules/sample/application/queries"
	"cariban/go-server/internal/shared/events"
)

func newSampleMux() *http.ServeMux {
	repo := samplerepo.NewInMemoryRepository()
	dispatcher := events.NewNopDispatcher()
	handler := samplehttp.NewHandler(
		samplecmd.NewCreateSampleCommand(repo, dispatcher),
		samplequery.NewGetSampleQuery(repo),
		samplequery.NewListSamplesQuery(repo),
	)
	mux := http.NewServeMux()
	handler.Register(mux)
	return mux
}

func TestSampleCRUD(t *testing.T) {
	t.Parallel()

	mux := newSampleMux()

	createReq := httptest.NewRequest(http.MethodPost, "/api/samples", bytes.NewBufferString(`{"name":"sample-1","description":"desc"}`))
	createReq.Header.Set("Content-Type", "application/json")
	createRec := httptest.NewRecorder()
	mux.ServeHTTP(createRec, createReq)
	if createRec.Code != http.StatusCreated {
		t.Fatalf("create status = %d body=%s", createRec.Code, createRec.Body.String())
	}

	var created struct {
		ID   string `json:"id"`
		Name string `json:"name"`
	}
	if err := json.NewDecoder(createRec.Body).Decode(&created); err != nil {
		t.Fatalf("decode create: %v", err)
	}
	if created.Name != "sample-1" {
		t.Fatalf("name = %q", created.Name)
	}

	getReq := httptest.NewRequest(http.MethodGet, "/api/samples/"+created.ID, nil)
	getRec := httptest.NewRecorder()
	mux.ServeHTTP(getRec, getReq)
	if getRec.Code != http.StatusOK {
		t.Fatalf("get status = %d", getRec.Code)
	}

	listReq := httptest.NewRequest(http.MethodGet, "/api/samples?limit=10&offset=0", nil)
	listRec := httptest.NewRecorder()
	mux.ServeHTTP(listRec, listReq)
	if listRec.Code != http.StatusOK {
		t.Fatalf("list status = %d", listRec.Code)
	}

	var listed struct {
		Total int `json:"total"`
	}
	if err := json.NewDecoder(listRec.Body).Decode(&listed); err != nil {
		t.Fatalf("decode list: %v", err)
	}
	if listed.Total != 1 {
		t.Fatalf("total = %d, want 1", listed.Total)
	}
}

func TestCreateSampleValidation(t *testing.T) {
	t.Parallel()

	mux := newSampleMux()
	req := httptest.NewRequest(http.MethodPost, "/api/samples", bytes.NewBufferString(`{"name":""}`))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)
	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want 400", rec.Code)
	}
}
