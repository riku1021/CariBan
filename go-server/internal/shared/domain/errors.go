package domain

// Kind はドメインエラーの種類（HTTP ステータスへの変換に使う）。
type Kind int

const (
	KindValidation Kind = iota
	KindNotFound
	KindConflict
	KindOperation
	KindUnauthorized
	KindForbidden
)

// Error はドメインエラーの基底型。
type Error struct {
	Kind    Kind
	Code    string
	Message string
}

func (e *Error) Error() string {
	if e == nil {
		return ""
	}
	return e.Message
}

func NewError(kind Kind, code, message string) *Error {
	return &Error{Kind: kind, Code: code, Message: message}
}

func NewValidationError(code, message string) *Error {
	return NewError(KindValidation, code, message)
}

func NewNotFoundError(code, message string) *Error {
	return NewError(KindNotFound, code, message)
}

func NewConflictError(code, message string) *Error {
	return NewError(KindConflict, code, message)
}

func NewOperationError(code, message string) *Error {
	return NewError(KindOperation, code, message)
}

func NewUnauthorizedError(code, message string) *Error {
	return NewError(KindUnauthorized, code, message)
}

func NewForbiddenError(code, message string) *Error {
	return NewError(KindForbidden, code, message)
}

func (k Kind) HTTPStatus() int {
	switch k {
	case KindValidation:
		return 400
	case KindUnauthorized:
		return 401
	case KindForbidden:
		return 403
	case KindNotFound:
		return 404
	case KindConflict:
		return 409
	default:
		return 500
	}
}

func (k Kind) TypeName() string {
	switch k {
	case KindValidation:
		return "validation_error"
	case KindUnauthorized:
		return "unauthorized"
	case KindForbidden:
		return "forbidden"
	case KindNotFound:
		return "not_found"
	case KindConflict:
		return "conflict"
	default:
		return "operation_error"
	}
}
