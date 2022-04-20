package main

import (
	"bytes"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/bxcodec/faker"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestStudentRegister(t *testing.T) {
	// student := fakeStudentGenerate()
	// token, err := generateToken(student)
	_db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	}
	DB = _db
	_ = DB.AutoMigrate(
		&Student{},
	)
	router := gin.Default()
	router.POST("/api/student/register", studentRegister)
	w := httptest.NewRecorder()
	// fmt.Println(w)
	type fakeStudentStruct struct {
		Email    string `faker:"email"`
		Password string `faker:"password"`
	}
	fakeStudent := fakeStudentStruct{}
	err = faker.FakeData(&fakeStudent)
	if err != nil {
		panic("Failed to create fake data")
	}

	rawData := fmt.Sprintf(`{
		"email": "%s" ,
		"password": "123456789"
		}`, fakeStudent.Email)
	// rawData := fmt.Sprintf(`{
	// 		"email": "abc@gmail.com" ,
	// 		"password": "123456789"
	// 		}`)
	// fmt.Println(rawData)
	newStudent := []byte(rawData)

	req, _ := http.NewRequest("POST", "/api/student/register", bytes.NewBuffer(newStudent))
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")
	router.ServeHTTP(w, req)

	// assert.NoError(t, err)
	assert.Equal(t, 201, w.Code)
}
func TestStudentLogin(t *testing.T) {

	// token, err := generateToken(student)
	_db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	}
	DB = _db
	_ = DB.AutoMigrate(
		&Student{},
	)
	router := gin.Default()
	router.POST("/api/student/login", studentLogin)
	w := httptest.NewRecorder()
	// fmt.Println(w)
	newStudent := []byte(`{
			"email": "abc@gmail.com",
			"password": "123456789"
		}`)
	req, _ := http.NewRequest("POST", "/api/student/login", bytes.NewBuffer(newStudent))
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")
	router.ServeHTTP(w, req)
	// fmt.Println(w)
	// assert.NoError(t, err)
	assert.Equal(t, 200, w.Code)
}
func TestStudentEnroll(t *testing.T) {
	student := fakeStudentGenerate()
	token, err := generateToken(student)
	assert.NoError(t, err)
	_db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	}
	DB = _db
	_ = DB.AutoMigrate(
		&Instructor{},
		&Student{},
		&Course{},
		&Enrollment{},
	)
	router := gin.Default()
	router.POST("/api/student/course/:courseID/enroll/", verifyToken, enrollCourse)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/student/course/1/enroll/", nil)
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", token))
	assert.NoError(t, err)
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)
}
