package domain

import (
	"regexp"
	"strings"
	"unicode/utf8"
)

var emailPattern = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)

type Email struct {
	value string
}

func NewEmail(value string) (Email, error) {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return Email{}, UserValidationError("メールアドレスは必須です")
	}
	if !emailPattern.MatchString(trimmed) {
		return Email{}, UserValidationError("無効なメールアドレス形式です: " + trimmed)
	}
	if len(trimmed) > 254 {
		return Email{}, UserValidationError("メールアドレスが長すぎます（最大254文字）")
	}
	return Email{value: strings.ToLower(trimmed)}, nil
}

func (e Email) String() string {
	return e.value
}

type UserName struct {
	FirstName string
	LastName  string
}

func NewUserName(firstName, lastName string) (UserName, error) {
	first := strings.TrimSpace(firstName)
	last := strings.TrimSpace(lastName)
	if first == "" {
		return UserName{}, UserValidationError("名は必須です")
	}
	if last == "" {
		return UserName{}, UserValidationError("姓は必須です")
	}
	if utf8.RuneCountInString(first) > 50 {
		return UserName{}, UserValidationError("名は1〜50文字である必要があります")
	}
	if utf8.RuneCountInString(last) > 50 {
		return UserName{}, UserValidationError("姓は1〜50文字である必要があります")
	}
	return UserName{FirstName: first, LastName: last}, nil
}

func (n UserName) String() string {
	return n.LastName + " " + n.FirstName
}

func (n UserName) FullName() string {
	return n.String()
}
