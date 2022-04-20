package main

import (
	"fmt"
	"testing"

	"github.com/bxcodec/faker"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func fakeInstructorGenerate() Instructor {
	_db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	}
	DB = _db
	// Create fake instructor
	type fakeInstructorStruct struct {
		Email    string `faker:"email"`
		Password string `faker:"password"`
	}
	fakeInstructor := fakeInstructorStruct{}
	err = faker.FakeData(&fakeInstructor)
	if err != nil {
		panic("Failed to create fake data")
	}
	newInstructor := Instructor{
		Email:    fakeInstructor.Email,
		Password: fakeInstructor.Password,
	}
	result := DB.Create(&newInstructor)
	if result.Error != nil {
		panic("Failed to create an instructor")
	}
	return newInstructor
}

func fakeCourseGenerate() Course {

	// Create instructor

	// Login
	newInstructor := fakeInstructorGenerate()
	// Create course

	// Create fake course
	type fakeCourseStruct struct {
		Title string `faker:"word"`
	}
	fakeCourse := fakeCourseStruct{}
	err := faker.FakeData(&fakeCourse)
	if err != nil {
		panic("Failed to create fake course")
	}
	newCourse := Course{
		Title:        fakeCourse.Title,
		InstructorID: newInstructor.ID,
	}
	result := DB.Create(&newCourse)
	if result.Error != nil {
		panic("Failed to create a course")
	}
	// courseId := int(newCourse.ID)
	return newCourse
}
func fakeStudentGenerate() Student {
	_db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	}
	DB = _db
	// create fake student
	type fakeStudentStruct struct {
		Email    string `faker:"email"`
		Password string `faker:"password"`
	}
	fakeStudent := fakeStudentStruct{}
	err = faker.FakeData(&fakeStudent)
	if err != nil {
		panic("Failed to create fake data")
	}
	newStudent := Student{
		Email:    fakeStudent.Email,
		Password: fakeStudent.Password,
	}
	result := DB.Create(&newStudent)
	if result.Error != nil {
		panic("Failed to create a student")
	}
	return newStudent
}

// func fakeModuleGenerate() Module{
// 	// create fake instructor
// 	// create fake coursefakeCourse := fakeCourseStruct{}
// 	err := faker.FakeData(&fakeCourse)
// 	if err != nil {
// 		panic("Failed to create fake course")
// 	}
// 	// create fake module
// 	type fakeModuleStruct struct{
// 		Title string `faker:"word"`
// 		Type string  `default:"quiz"`

// 	}
// }
// func fakeQuizModuleGenerate() Quiz{
// 	// create fake instructor
// 	// create fake course
// 	newCourse:= fakeCourseGenerate()
// 	// create fake module

// 	type fakeQuizStruct struct{

// 	}
// }
func TestCourseExist(t *testing.T) {
	// Create instructor
	// Login
	// Create course

	c := gin.Context{}

	course := fakeCourseGenerate()
	// Check if the course exists
	got := courseExist(int(course.ID), &c)
	want := true
	if got != want {
		t.Errorf("Course exists test failed")
	} else {
		fmt.Println("Course exists Test passed!")
	}
}

func TestCourseCreate(t *testing.T) {
	// Create instructor
	// Login
	// Create course

	c := gin.Context{}

	course := fakeCourseGenerate()
	// Check if the course exists
	got := courseExist(int(course.ID), &c)
	want := true
	if got != want {
		t.Errorf("Course creation test failed")
	} else {
		fmt.Println("Course creation Test passed!")
	}

}

func TestPublished(t *testing.T) {
	c := gin.Context{}
	course := fakeCourseGenerate()
	got := isPublished(int(course.ID), &c)
	want := course.IsPublished
	// want := true
	if got != want {
		t.Errorf("Course Published test failed")
	} else {
		fmt.Println("Course Published Test passed!")
	}

}

func TestEnrolled(t *testing.T) {

	// c := gin.Context{}
	course := fakeCourseGenerate()
	student := fakeStudentGenerate()
	got := isEnrolled(student.ID, int(course.ID))

	result := DB.Where("course_id = ? AND student_id=?", course.ID, student.ID)
	want := result.RowsAffected == 1
	if got != want {
		t.Errorf("Course Enrollment test failed")
	} else {
		fmt.Println("Course Enrollment Test passed!")
	}

}
