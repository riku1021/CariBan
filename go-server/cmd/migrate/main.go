package main

import (
	"database/sql"
	"fmt"
	"os"

	"cariban/go-server/internal/infrastructure/config"
	"cariban/go-server/internal/infrastructure/logger"
	"cariban/go-server/migrations"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		logger.New("INFO").Error("failed to load config: %v", err)
		os.Exit(1)
	}

	log := logger.New(cfg.LogLevel)

	if err := run(cfg.DatabaseURL); err != nil {
		log.Error("migration failed: %v", err)
		os.Exit(1)
	}

	log.Info("migrations applied")
}

func run(databaseURL string) error {
	db, err := sql.Open("pgx", databaseURL)
	if err != nil {
		return fmt.Errorf("open database: %w", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		return fmt.Errorf("ping database: %w", err)
	}

	goose.SetBaseFS(migrations.FS)
	if err := goose.SetDialect("postgres"); err != nil {
		return fmt.Errorf("set dialect: %w", err)
	}

	if err := goose.Up(db, "."); err != nil {
		return fmt.Errorf("goose up: %w", err)
	}

	return nil
}
