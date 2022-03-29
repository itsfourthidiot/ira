package main

import (
	"time"

	"gorm.io/gorm"
)

type User interface {
	getUserDetails() (string, string)
}

type Instructor struct {
	gorm.Model
	Email    string   `json:"email" gorm:"unique"`
	Password string   `json:"-"`
	Courses  []Course `json:"courses"`
}

func (i Instructor) getUserDetails() (string, string) {
	return i.Email, "instructor"
}

type Student struct {
	gorm.Model
	Email       string       `json:"email" gorm:"unique"`
	Password    string       `json:"-"`
	Enrollments []Enrollment `json:"enrollements"`
	Scores      []Score
}

func (s Student) getUserDetails() (string, string) {
	return s.Email, "student"
}

type Course struct {
	gorm.Model
	Title        string       `json:"title" gorm:"not null"`
	Description  *string      `json:"description"`
	IsPublished  bool         `json:"isPublished" gorm:"default:false"`
	PublishedAt  *time.Time   `json:"publishedAt"`
	InstructorID uint         `json:"instructorId"`
	Enrollments  []Enrollment `json:"-"`
	Modules      []Module     `json:"modules"`
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
	Video     Video  `json:"video"`
	Quiz      Quiz   `json:"quiz"`
}

type Video struct {
	gorm.Model
	Key      *string `json:"key"`
	ModuleID uint    `json:"moduleId"`
}
type Quiz struct {
	gorm.Model
	ModuleID       uint `json:"moduleId"`
	NumOfQuestions int  `json:"numOfQuestions"`
	Questions      []Question
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
