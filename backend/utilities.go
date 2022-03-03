package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func isEnrolled(newStudentId uint, newCourseId uint) bool {
	// check for is published....

	// ...

	alreadyEnrolled := Enrollment{}
	result := DB.Where("course_id = ? AND student_id=?", newCourseId, newStudentId).First(&alreadyEnrolled)
	return result.RowsAffected == 1
}

func enrollCourse(c *gin.Context) {
	type Req struct {
		CourseId uint `json:"courseId" binding:"required"`
		// StudentId uint `json:"studentId" binding:"required"`
	}
	req := Req{}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	// Check if the course is valid
	email, ok := c.Get("email")
	fmt.Println(email)
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

	if isEnrolled(studentID, req.CourseId) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Already Registered",
		})
		return
	} else {
		newEnroll := Enrollment{
			StudentID: studentID,
			CourseID:  req.CourseId,
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
