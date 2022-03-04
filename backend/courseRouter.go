package main

import (
	"net/http"
	"strconv"

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

func courseDescriptionUpdate(c *gin.Context) {

	type Req struct {
		// CourseId    string `json:"courseId" binding:"required"`
		Description string `json:"description" binding:"required,min=1"`
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
		c.JSON(http.StatusNotFound, gin.H{
			"error": "course not found",
		})
		return
	}
	// Updating course description
	course.Description = &req.Description
	res := DB.Save(&course)
	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	c.JSON(http.StatusOK, course)
}

func getDescription(c *gin.Context) {
	// courseId := c.Query("courseId") // shortcut for c.Request.URL.Query().Get("lastname")

	courseId, err := strconv.Atoi(c.Param("courseID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course not found",
		})
		return

	}
	course := Course{}

	result := DB.Where("ID = ?", courseId).First(&course)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course id not found",
		})
		return
	}
	// Check if the course is valid

	if !courseExist(int(course.ID), c) {
		return
	}
	email, ok := c.Get("email")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}

	result = DB.Model(&Course{}).Select("courses.*").Joins("inner join instructors on courses.instructor_id = instructors.id").Where("instructors.email = ?", email).Where("courses.id = ?", course.ID).First(&course)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "course not found",
		})
		return
	}

	c.JSON(http.StatusOK, course)

	// c.String(http.StatusOK, "Hello %s %s", firstname, lastname)

}

func listAllCourses(c *gin.Context) {
	var courses []Course
	result := DB.Where("is_published = 1").Find(&courses)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"courses": courses,
	})
}
