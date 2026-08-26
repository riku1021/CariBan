package domain

import shared "cariban/go-server/internal/shared/domain"

func SampleValidationError(message string) *shared.Error {
	return shared.NewValidationError("SAMPLE_VALIDATION_ERROR", message)
}

func SampleNotFoundError(entityID string) *shared.Error {
	message := "サンプルエンティティが見つかりません"
	if entityID != "" {
		message = "サンプルエンティティが見つかりません: " + entityID
	}
	return shared.NewNotFoundError("SAMPLE_NOT_FOUND", message)
}

func DuplicateEntityError(entityID string) *shared.Error {
	message := "エンティティは既に存在します"
	if entityID != "" {
		message = "エンティティは既に存在します: " + entityID
	}
	return shared.NewConflictError("DUPLICATE_ENTITY", message)
}

func RepositoryOperationError(message string) *shared.Error {
	return shared.NewOperationError("REPOSITORY_OPERATION_ERROR", "リポジトリ操作に失敗しました: "+message)
}
