package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// Instructor registration
func instructorRegister(c *gin.Context) {
	// Parse input request
	type Req struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=8,max=20"`
	}
	req := Req{}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	// Check if the instructor with email already exists
	existingInstructor := Instructor{}
	result := DB.Where("email = ?", req.Email).First(&existingInstructor)
	if result.RowsAffected == 1 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "user with email already exists",
		})
		return
	}
	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "interval server error",
		})
		return
	}
	// Insert into database
	newInstructor := Instructor{
		Email:    req.Email,
		Password: string(hashedPassword),
	}
	result = DB.Create(&newInstructor)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	c.JSON(http.StatusCreated, newInstructor)
}

// Instructor login
func instructorLogin(c *gin.Context) {
	type Req struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=8,max=20"`
	}
	req := Req{}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	// Check if the instructor exists
	instructor := Instructor{}
	res := DB.Where("email = ?", req.Email).First(&instructor)
	if res.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "user not found",
		})
		return
	}
	// Check if the password match
	err = bcrypt.CompareHashAndPassword([]byte(instructor.Password), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "wrong password",
		})
		return
	}
	// Generate token
	token, err := generateToken(instructor)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}

func instructorCourses(c *gin.Context) {
	// Get the instructor object
	email, ok := c.Get("email")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	instructor := Instructor{}
	result := DB.Where("email = ?", email).First(&instructor)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "instructor not found",
		})
		return
	}
	// Get all course corresponding to that instructor
	var courses []Course
	result = DB.Model(&Course{}).Where("courses.instructor_id = ?", instructor.ID).Find(&courses)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	publishedCourses := make([]Course, 0)
	unpublishedCourses := make([]Course, 0)
	for _, course := range courses {
		if course.IsPublished {
			publishedCourses = append(publishedCourses, course)
		} else {
			unpublishedCourses = append(unpublishedCourses, course)
		}
	}
	c.JSON(http.StatusOK, gin.H{
		"courses": gin.H{
			"published":   publishedCourses,
			"unpublished": unpublishedCourses,
		},
	})
}

func publishCourse(c *gin.Context) {
	// Get the instructor object
	email, ok := c.Get("email")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	CourseId, err := strconv.Atoi(c.Param("courseID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course not found",
		})
		return

	}
	course := Course{}
	result := DB.Model(&Course{}).Select("courses.*").Joins("inner join instructors on courses.instructor_id = instructors.id").Where("instructors.email = ?", email).Where("courses.id = ?", CourseId).First(&course)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorised access for this course",
		})
		return
	}
	// check if already published
	if isPublished(CourseId, c) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course already published",
		})
		return
	}
	// Publishing course
	course.IsPublished = true
	res := DB.Save(&course)
	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	c.JSON(http.StatusOK, course)

}
