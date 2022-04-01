package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// Student registration
func studentRegister(c *gin.Context) {
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
	// Check if the student with email already exists
	existingStudent := Student{}
	result := DB.Where("email = ?", req.Email).First(&existingStudent)
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
	newStudent := Student{
		Email:    req.Email,
		Password: string(hashedPassword),
	}
	result = DB.Create(&newStudent)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	c.JSON(http.StatusCreated, newStudent)
}

// Student login
func studentLogin(c *gin.Context) {
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
	// Check if the student exists
	student := Student{}
	res := DB.Where("email = ?", req.Email).First(&student)
	if res.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "user not found",
		})
		return
	}
	// Check if the password match
	err = bcrypt.CompareHashAndPassword([]byte(student.Password), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "wrong password",
		})
		return
	}
	token, err := generateToken(student)
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

func studentCourses(c *gin.Context) {
	var courses []Course
	// getting student id
	email, ok := c.Get("email")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	student := Student{}
	result := DB.Where("email = ?", email).First(&student)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "student not found",
		})
		return
	}

	result = DB.Model(&Course{}).Select("courses.*").Joins("inner join enrollments on courses.id = enrollments.course_id").Where("enrollments.student_id = ?", student.ID).Find(&courses)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course  not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"courses": courses,
	})
}

func checkEnrollCourse(c *gin.Context) {

	courseId, err := strconv.Atoi(c.Param("courseID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course not found",
		})
		return

	}
	// check if course is valid
	if !courseExist(courseId, c) {
		return
	}

	// check if course is published
	if !isPublished(courseId, c) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course not published",
		})
		return
	}

	// Get student ID
	email, ok := c.Get("email")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	student := Student{}
	result := DB.Where("email = ?", email).First(&student)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}

	studentID := student.ID
	c.JSON(http.StatusOK, gin.H{
		"isEnrolled": isEnrolled(studentID, courseId),
	})

}

func enrollCourse(c *gin.Context) {
	courseId, err := strconv.Atoi(c.Param("courseID"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course not found",
		})
		return

	}

	// Check if the course is valid
	if !courseExist(courseId, c) {
		return
	}
	// check if course is Published
	if !isPublished(courseId, c) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course not published",
		})
		return
	}

	// Get student ID
	email, ok := c.Get("email")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	student := Student{}
	result := DB.Where("email = ?", email).First(&student)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	studentID := student.ID

	// Check if student is already enrolled
	if isEnrolled(studentID, courseId) {
		if result.RowsAffected == 1 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Already Registered",
			})
		}
		return
	} else {
		newEnroll := Enrollment{
			StudentID: studentID,
			CourseID:  uint(courseId),
		}
		result := DB.Create(&newEnroll)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "internal server error",
			})
			return
		}
		c.JSON(http.StatusOK, newEnroll)
	}
}
