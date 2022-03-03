package main

import (
	"context"
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
)

func videoModuleCreate(c *gin.Context) {
	// Parse input request
	type Req struct {
		Title     string                `form:"title" binding:"required,min=1"`
		File      *multipart.FileHeader `form:"file" binding:"required"`
		IsPrivate string                `form:"isPrivate" binding:"required,oneof=true false"`
	}
	req := Req{}
	err := c.ShouldBind(&req)
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
	courseId, err := strconv.Atoi(c.Param("courseId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	course := Course{}
	dbRes := DB.Model(&Course{}).Select("courses.*").
		Joins("inner join instructors on courses.instructor_id = instructors.id").
		Where("instructors.email = ?", email).
		Where("courses.id = ?", courseId).
		First(&course)
	if dbRes.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "course not found",
		})
		return
	}

	// Upload file to the S3 and get back the URL
	bucket := aws.String(os.Getenv("AWS_BUCKET"))
	filename := aws.String(fmt.Sprintf("%s/%d/%s_%s", email, course.ID, time.Now().Format("20060102150405"), req.File.Filename))
	fileFormat := strings.Split(req.File.Header.Get("Content-Type"), "/")[0]
	if fileFormat != "video" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect file format",
		})
		return
	}
	file, err := req.File.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	defer file.Close()
	input := &s3.PutObjectInput{
		Bucket: bucket,
		Key:    filename,
		Body:   file,
	}
	awsRes, err := uploadFile(context.TODO(), input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}

	// Add entry to the modules and videos table
	isPrivate, _ := strconv.ParseBool(req.IsPrivate)
	newModule := Module{
		Title:     req.Title,
		Type:      "video",
		IsPrivate: isPrivate,
	}
	dbRes = DB.Create(&newModule)
	if dbRes.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	url := awsRes.Location
	newVideo := Video{
		Url:      url,
		ModuleID: newModule.ID,
	}
	dbRes = DB.Create(&newVideo)
	if dbRes.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	c.JSON(http.StatusOK, newVideo)
}
