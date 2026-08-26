package domain

import "strings"

type SampleName struct {
	value string
}

func NewSampleName(value string) (SampleName, error) {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return SampleName{}, SampleValidationError("値は空にできません")
	}
	return SampleName{value: trimmed}, nil
}

func (n SampleName) String() string {
	return n.value
}

func (n SampleName) IsEmpty() bool {
	return strings.TrimSpace(n.value) == ""
}
