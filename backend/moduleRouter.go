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
		CourseID:  uint(courseId),
	}
	dbRes = DB.Create(&newModule)
	if dbRes.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	key := awsRes.Key
	newVideo := Video{
		Key:      key,
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

func quizModuleCreate(c *gin.Context) {

	type OptionStruct struct {
		Content   string `json:"content" binding:"required"`
		IsCorrect bool   `json:"isCorrect" binding:"required"`
	}

	type QuestionStruct struct {
		Content string          `json:"content" binding:"required"`
		Options []*OptionStruct `json:"options" binding:"required"`
	}

	type Req struct {
		// Module object with json list
		// CourseID  string            `json:"courseId" binding:"required,min=1"`
		Title     string            `json:"title" binding:"required,min=1"`
		Questions []*QuestionStruct `json:"questions" binding:"required"`
	}

	req := Req{}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	email, _ := c.Get("email")
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
	// Add entry to database
	// Create new Module

	courseId, _ = strconv.Atoi(c.Param("courseId"))

	// courseId, _ := strconv.Atoi(c.Param("courseId"))

	// fmt.Println(courseId)

	newModule := Module{
		Title:     req.Title,
		Type:      "quiz",
		IsPrivate: true,
		CourseID:  uint(courseId),
	}
	result := DB.Create(&newModule)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	// Create new Quiz
	// numQuestions, _ := strconv.Atoi(len(req.Questions))
	newQuiz := Quiz{
		ModuleID:       newModule.ID,
		NumOfQuestions: len(req.Questions),
	}
	result = DB.Create(&newQuiz)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}

	// Add questions

	for _, quest := range req.Questions {
		questions := Question{}
		questions.QuizID = newQuiz.ID
		questions.Content = quest.Content
		result = DB.Create(&questions)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "internal server error",
			})
			return
		}
		// Add options
		for _, opt := range quest.Options {
			options := Option{}
			options.QuestionID = questions.ID
			options.Content = opt.Content
			options.IsCorrect = opt.IsCorrect
			result = DB.Create(&options)
			if result.Error != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "internal server error",
				})
				return
			}

		}

	}
	DB.Preload("Quiz.Questions.Options").Find(&newModule)
	c.JSON(http.StatusOK, newModule)
}

func scoreCalculation(c *gin.Context) {
	// validate student
	// student response
	// on submit score will be shown
	type Req struct {
		// Module object with json list
		StudentID uint `json:"studentId" binding:"required,min=1"`
		QuizID    uint `json:"quizId" binding:"required,min=1"`
		// OptionID  uint   `json:"quizId" binding:"required,min=1"`
		Response []uint `json:"response" binding:"required"`
	}
	req := Req{}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	count := 0
	for _, opt := range req.Response {
		options := Option{}
		result := DB.Where("id=?", opt).Find(&options)
		// fmt.Println(options)
		// fmt.Println(111111111)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "internal server error",
			})
			return
		}
		if options.IsCorrect {
			count += 1
		}
	}
	// update scores Table in to db
	newScore := Score{
		StudentID:  req.StudentID,
		QuizID:     req.QuizID,
		ScoreValue: uint(count),
	}
	// newScore.StudentID = req.StudentID
	// newScore.QuizID = req.QuizID
	// newScore.ScoreValue = uint(count)
	result := DB.Create(&newScore)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	c.JSON(http.StatusOK, newScore)
}
