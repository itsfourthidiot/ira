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
	Email       string `json:"email" gorm:"unique"`
	Password    string `json:"-"`
	Enrollments []Enrollment
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
	Enrollments  []Enrollment
}

type Enrollment struct {
	gorm.Model
	StudentID uint `json:"studentId" gorm:"primaryKey"`
	CourseID  uint `json:"courseId" gorm:"primaryKey"`
	// Enrolled_on *time.Time
}
