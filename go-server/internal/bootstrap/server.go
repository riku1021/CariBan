package bootstrap

import (
	"context"
	"net/http"
	"time"

	samplerepo "cariban/go-server/internal/adapter/repository/sample"
	userrepo "cariban/go-server/internal/adapter/repository/user"
	"cariban/go-server/internal/infrastructure/config"
	"cariban/go-server/internal/infrastructure/db"
	"cariban/go-server/internal/infrastructure/logger"
	"cariban/go-server/internal/infrastructure/middleware"
	healthhttp "cariban/go-server/internal/modules/health/adapters/http"
	healthapp "cariban/go-server/internal/modules/health/application"
	samplehttp "cariban/go-server/internal/modules/sample/adapters/http"
	samplecmd "cariban/go-server/internal/modules/sample/application/commands"
	samplequery "cariban/go-server/internal/modules/sample/application/queries"
	userhttp "cariban/go-server/internal/modules/user/adapters/http"
	usercmd "cariban/go-server/internal/modules/user/application/commands"
	userquery "cariban/go-server/internal/modules/user/application/queries"
	userdomain "cariban/go-server/internal/modules/user/domain"
	"cariban/go-server/internal/shared/events"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Server struct {
	HTTP   *http.Server
	Pool   *pgxpool.Pool
	Logger *logger.Logger
}

func New(cfg *config.Config, log *logger.Logger) (*Server, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	pool, err := db.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Warn("database connection skipped: %v", err)
	} else {
		log.Info("database connected")
	}

	dispatcher := events.NewLogDispatcher()

	sampleRepository := samplerepo.NewInMemoryRepository()
	createSample := samplecmd.NewCreateSampleCommand(sampleRepository, dispatcher)
	getSample := samplequery.NewGetSampleQuery(sampleRepository)
	listSamples := samplequery.NewListSamplesQuery(sampleRepository)
	sampleHandler := samplehttp.NewHandler(createSample, getSample, listSamples)

	userRepository := userrepo.NewInMemoryRepository()
	userService := userdomain.NewUserDomainService(userRepository)
	createUser := usercmd.NewCreateUserCommand(userService, dispatcher)
	updateProfile := usercmd.NewUpdateUserProfileCommand(userRepository, dispatcher)
	deactivateUser := usercmd.NewDeactivateUserCommand(userService, dispatcher)
	getUser := userquery.NewGetUserQuery(userRepository)
	listUsers := userquery.NewListUsersQuery(userRepository)
	userHandler := userhttp.NewHandler(createUser, updateProfile, deactivateUser, getUser, listUsers)

	healthHandler := healthhttp.NewHandler(healthapp.NewHealthCheckUseCase())

	mux := http.NewServeMux()
	healthHandler.Register(mux)
	sampleHandler.Register(mux)
	userHandler.Register(mux)

	handler := middleware.Chain(
		mux,
		middleware.AccessLog(log, cfg.Env),
		middleware.CORS,
		middleware.SecurityHeaders(cfg.Security),
	)

	httpServer := &http.Server{
		Addr:         config.Addr(cfg),
		Handler:      handler,
		ReadTimeout:  time.Duration(cfg.ReadTimeout) * time.Second,
		WriteTimeout: time.Duration(cfg.WriteTimeout) * time.Second,
	}

	return &Server{HTTP: httpServer, Pool: pool, Logger: log}, nil
}

func (s *Server) Close() {
	if s.Pool != nil {
		s.Pool.Close()
	}
}
