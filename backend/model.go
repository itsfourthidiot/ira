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
	Scores      []Score
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
	Modules      []Module
}

type Enrollment struct {
	gorm.Model
	StudentID   uint `json:"studentId" gorm:"primaryKey"`
	CourseID    uint `json:"courseId" gorm:"primaryKey"`
	Enrolled_on *time.Time
}

type Module struct {
	gorm.Model
	Title     string `json:"title" gorm:"not null"`
	Type      string `json:"type"`
	IsPrivate bool   `json:"isPrivate"`
	CourseID  uint   `json:"courseId"`
	Video     Video
	Quiz      Quiz
}

type Video struct {
	gorm.Model
	Url      string `json:"url"`
	ModuleID uint   `json:"moduleId"`
}
type Quiz struct {
	gorm.Model
	ModuleID       uint       `json:"moduleId"`
	NumOfQuestions int        `json:"numOfQuestions"`
	Questions      []Question `json:"questions"`
}
type Question struct {
	gorm.Model
	QuizID  uint     `json:"quizId"`
	Content string   `json:"content" gorm:"not null"`
	Options []Option `json:"options"`
}

type Option struct {
	gorm.Model
	QuestionID uint   `json:"questionId"`
	Content    string `json:"content" gorm:"not null"`
	IsCorrect  bool   `json:"isCorrect" gorm:"default:false"`
}
type Score struct {
	gorm.Model
	StudentID  uint `json:"studentId"`
	QuizID     uint `json:"quizId"`
	ScoreValue uint `json:"scoreValue"`
}
