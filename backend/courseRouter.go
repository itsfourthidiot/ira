package main

import (
	"context"
	"net/http"
	"os"
	"strconv"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
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
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorised access for this course",
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
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorised access for this course",
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

func getCourseDetails(c *gin.Context) {
	courseId, err := strconv.Atoi(c.Param("courseId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	course := Course{}
	result := DB.Preload("Modules").Where("ID = ?", courseId).First(&course)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course id not found",
		})
		return
	}
	c.JSON(http.StatusOK, course)
}

func getModuleDetails(c *gin.Context) {
	// Check if the user has inserted course id in correct format
	courseId, courseIdErr := strconv.Atoi(c.Param("courseId"))
	moduleId, moduleIdErr := strconv.Atoi(c.Param("moduleId"))
	if (courseIdErr != nil) || (moduleIdErr != nil) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	// Find the course and corresponding module
	course := Course{}
	result := DB.Preload("Modules.Video").Preload("Modules.Quiz.Questions.Options").Preload("Modules", "ID = ?", moduleId).Where("ID = ?", courseId).First(&course)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "course id not found",
		})
		return
	} else if len(course.Modules) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "module id not found",
		})
		return
	}
	// Find the user email ID and role
	email, okEmail := c.Get("email")
	role, okRole := c.Get("role")
	if (!okEmail) || (!okRole) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	enrollment := Enrollment{}
	if role == "student" {
		res := DB.Joins("inner join students on students.id = enrollments.student_id").
			Where("students.email = ?", email).
			Where("enrollments.course_id = ?", courseId).
			First(&enrollment)
		if res.RowsAffected == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "does not have valid permissions",
			})
			return
		} else {
			module := course.Modules[0]
			if module.Type == "quiz" {
				c.JSON(http.StatusOK, course.Modules[0])
				return
			} else if module.Type == "video" {
				// Generate presigned URL
				bucket := aws.String(os.Getenv("AWS_BUCKET"))
				key := module.Video.Key
				input := &s3.GetObjectInput{
					Bucket: bucket,
					Key:    key,
				}
				psClient := s3.NewPresignClient(client)
				resp, err := GetPresignedURL(context.TODO(), psClient, input)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{
						"error": "internal server error",
					})
					return
				} else {
					c.JSON(http.StatusOK, gin.H{
						"module":       module,
						"presignedUrl": resp.URL,
					})
					return
				}
			}
		}
		c.JSON(http.StatusOK, course.Modules[0])
		return
	} else if role == "instructor" {
		instructor := Instructor{}
		result := DB.Where("email = ?", email).First(&instructor)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "internal server error",
			})
			return
		} else if instructor.ID != course.InstructorID {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "does not have valid permissions",
			})
			return
		} else {
			module := course.Modules[0]
			if module.Type == "quiz" {
				c.JSON(http.StatusOK, course.Modules[0])
				return
			} else if module.Type == "video" {
				// Generate presigned URL
				bucket := aws.String(os.Getenv("AWS_BUCKET"))
				key := module.Video.Key
				input := &s3.GetObjectInput{
					Bucket: bucket,
					Key:    key,
				}
				psClient := s3.NewPresignClient(client)
				resp, err := GetPresignedURL(context.TODO(), psClient, input)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{
						"error": "internal server error",
					})
					return
				} else {
					c.JSON(http.StatusOK, gin.H{
						"module":       module,
						"presignedUrl": resp.URL,
					})
					return
				}
			}
		}
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
}
