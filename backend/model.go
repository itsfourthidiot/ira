package main

import "gorm.io/gorm"

type User interface {
	getUserDetails() string
}

type Instructor struct {
	gorm.Model
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"-"`
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
