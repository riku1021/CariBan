package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"cariban/go-server/internal/bootstrap"
	"cariban/go-server/internal/infrastructure/config"
	"cariban/go-server/internal/infrastructure/logger"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		logger.New("INFO").Error("failed to load config: %v", err)
		os.Exit(1)
	}

	log := logger.New(cfg.LogLevel)

	server, err := bootstrap.New(cfg, log)
	if err != nil {
		log.Error("failed to bootstrap server: %v", err)
		os.Exit(1)
	}
	defer server.Close()

	go func() {
		log.Info("server starting on %s (env=%s)", server.HTTP.Addr, cfg.Env)
		if listenErr := server.HTTP.ListenAndServe(); listenErr != nil && !errors.Is(listenErr, http.ErrServerClosed) {
			log.Error("server failed: %v", listenErr)
			os.Exit(1)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Info("server shutting down...")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := server.HTTP.Shutdown(ctx); err != nil {
		log.Error("server forced to shutdown: %v", err)
		os.Exit(1)
	}

	log.Debug("server exited")
}
