package main

import (
	"time"

	"gorm.io/gorm"
)

type User interface {
	getUserDetails() string
}

type Instructor struct {
	gorm.Model
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"-"`
	Courses  []Course
}

func (i Instructor) getUserDetails() string {
	return i.Email
}

type Student struct {
	gorm.Model
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"-"`
}

func (s Student) getUserDetails() string {
	return s.Email
}

type Course struct {
	gorm.Model
	Title        string     `json:"title" gorm:"not null"`
	Description  *string    `json:"description"`
	IsPublished  bool       `json:"isPublished" gorm:"default:false"`
	PublishedAt  *time.Time `json:"publishedAt"`
	InstructorID uint       `json:"instructorId"`
}

type Module struct {
	gorm.Model
	Title     string `json:"title" gorm:"not null"`
	Type      string `json:"type"`
	IsPrivate bool   `json:"isPrivate"`
	Video     Video
}

type Video struct {
	gorm.Model
	Url      string `json:"url"`
	ModuleID uint   `json:"moduleId"`
}
