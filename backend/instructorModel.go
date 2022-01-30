package main

import "gorm.io/gorm"

type Instructor struct {
	gorm.Model
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"-"`
}

func (i Instructor) getUserDetails() string {
	return i.Email
}
