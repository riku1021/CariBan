package domain

import "time"

type HealthStatus struct {
	Status    string
	Timestamp time.Time
}

func Healthy() HealthStatus {
	return HealthStatus{
		Status:    "healthy",
		Timestamp: time.Now().UTC(),
	}
}
