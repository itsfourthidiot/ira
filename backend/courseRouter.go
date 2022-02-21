package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Course creation
func courseCreate(c *gin.Context) {
	// Parse input request
	type Req struct {
		Title string `json:"title" binding:"required,min=1"`
	}
	req := Req{}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	// Get the instructor ID
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
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	instructorID := instructor.ID
	// Create a new course with title and instructor ID
	newCourse := Course{
		Title:        req.Title,
		InstructorID: instructorID,
	}
	result = DB.Create(&newCourse)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	c.JSON(http.StatusOK, newCourse)
}
