package application

import "cariban/go-server/internal/modules/health/domain"

type HealthCheckUseCase struct{}

func NewHealthCheckUseCase() *HealthCheckUseCase {
	return &HealthCheckUseCase{}
}

func (u *HealthCheckUseCase) Execute() domain.HealthStatus {
	return domain.Healthy()
}
