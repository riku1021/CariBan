package domain

import shared "cariban/go-server/internal/shared/domain"

func UserValidationError(message string) *shared.Error {
	return shared.NewValidationError("USER_VALIDATION_ERROR", message)
}

func UserNotFoundError(userID string) *shared.Error {
	return shared.NewNotFoundError("USER_NOT_FOUND", "ユーザーが見つかりません: "+userID)
}

func UserProfileNotFoundError(userID string) *shared.Error {
	return shared.NewNotFoundError("USER_PROFILE_NOT_FOUND", "ユーザープロファイルが見つかりません: "+userID)
}

func DuplicateEmailError(email string) *shared.Error {
	return shared.NewConflictError("DUPLICATE_EMAIL", "このメールアドレスは既に使用されています: "+email)
}
