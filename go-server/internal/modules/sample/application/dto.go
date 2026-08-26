package application

import "time"

type CreateSampleRequest struct {
	Name        string
	Description *string
}

type CreateSampleResponse struct {
	ID        string
	Name      string
	CreatedAt time.Time
}

type GetSampleResponse struct {
	ID          string
	Name        string
	Description *string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type ListSamplesRequest struct {
	Limit  int
	Offset int
}

type SampleItem struct {
	ID        string
	Name      string
	CreatedAt time.Time
}

type ListSamplesResponse struct {
	Items  []SampleItem
	Total  int
	Limit  int
	Offset int
}
