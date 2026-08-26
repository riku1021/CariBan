package domain

import (
	"strings"
	"time"
	"unicode/utf8"
)

const (
	maxBioLength      = 500
	maxLocationLength = 100
)

type UserProfile struct {
	Bio       *string
	AvatarURL *string
	Website   *string
	Location  *string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func CreateEmptyProfile() *UserProfile {
	now := time.Now().UTC()
	return &UserProfile{CreatedAt: now, UpdatedAt: now}
}

func CreateProfile(bio *string) (*UserProfile, error) {
	profile := CreateEmptyProfile()
	profile.Bio = bio
	if err := profile.validate(); err != nil {
		return nil, err
	}
	return profile, nil
}

func (p *UserProfile) Update(bio, avatarURL, website, location *string) error {
	if bio != nil {
		p.Bio = bio
	}
	if avatarURL != nil {
		if *avatarURL == "" {
			p.AvatarURL = nil
		} else {
			p.AvatarURL = avatarURL
		}
	}
	if website != nil {
		if *website == "" {
			p.Website = nil
		} else {
			p.Website = website
		}
	}
	if location != nil {
		p.Location = location
	}
	if err := p.validate(); err != nil {
		return err
	}
	p.UpdatedAt = time.Now().UTC()
	return nil
}

func (p *UserProfile) validate() error {
	if p.Bio != nil && utf8.RuneCountInString(*p.Bio) > maxBioLength {
		return UserValidationError("自己紹介は500文字以下である必要があります")
	}
	if p.Location != nil && utf8.RuneCountInString(*p.Location) > maxLocationLength {
		return UserValidationError("所在地は100文字以下である必要があります")
	}
	if p.AvatarURL != nil && !isHTTPURL(*p.AvatarURL) {
		return UserValidationError("アバターURLは有効なURLである必要があります")
	}
	if p.Website != nil && !isHTTPURL(*p.Website) {
		return UserValidationError("ウェブサイトURLは有効なURLである必要があります")
	}
	return nil
}

func isHTTPURL(value string) bool {
	return strings.HasPrefix(value, "http://") || strings.HasPrefix(value, "https://")
}
