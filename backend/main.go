package main

import (
	"context"
	"embed"
	"io/fs"
	"net/http"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB
var secretKey []byte
var client *s3.Client

//go:embed static
var static embed.FS

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func getToken(c *gin.Context) (string, bool) {
	authValue := c.GetHeader("Authorization")
	arr := strings.Split(authValue, " ")
	if len(arr) != 2 {
		return "", false
	}
	authType := strings.Trim(arr[0], "\n\r\t")
	if strings.ToLower(authType) != strings.ToLower("Bearer") {
		return "", false
	}
	return strings.Trim(arr[1], "\n\t\r"), true
}

func verifyToken(c *gin.Context) {
	token, ok := getToken(c)
	if !ok {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "token not found",
		})
		return
	}
	email, role, err := validateToken(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "user unauthorized",
		})
	}
	c.Set("email", email)
	c.Set("role", role)
	c.Next()
}

func staticHandler(webapp fs.FS) gin.HandlerFunc {
	directory := http.FS(webapp)
	fileserver := http.FileServer(directory)
	return func(c *gin.Context) {
		_, err := directory.Open(c.Request.URL.Path)
		if err != nil {
			c.Request.URL.Path = "/"
			fileserver.ServeHTTP(c.Writer, c.Request)
			c.Abort()
		} else {
			fileserver.ServeHTTP(c.Writer, c.Request)
			c.Abort()
		}
	}
}

func main() {
	//load env variables
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}
	secretKey = []byte(os.Getenv("SECRET_KEY"))

	// Configure AWS client
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		panic("configuration error, " + err.Error())
	}
	client = s3.NewFromConfig(cfg)

	// Connect to the database using GORM
	_db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	}
	DB = _db
	err = DB.AutoMigrate(
		&Instructor{},
		&Student{},
		&Course{},
		&Module{},
		&Video{},
		&Enrollment{},
		&Quiz{},
		&Question{},
		&Option{},
		&Score{},
	)
	if err != nil {
		panic("Unable to create tables")
	}

	// Create routes using gin-gonic and run the server
	r := gin.Default()
	r.Use(CORSMiddleware())
	instructorRoutes := r.Group("/instructor")
	{
		instructorRoutes.POST("/register", instructorRegister)
		instructorRoutes.POST("/login", instructorLogin)
		instructorRoutes.POST("/course", verifyToken, courseCreate)
		instructorRoutes.POST("/course/:courseId/module/video", verifyToken, videoModuleCreate)
		instructorRoutes.POST("/course/:courseId/module/quiz", verifyToken, quizModuleCreate)
		instructorRoutes.GET("/course/:courseID/description", verifyToken, getDescription)
		instructorRoutes.PUT("/course/:courseID/description", verifyToken, courseDescriptionUpdate)
		instructorRoutes.GET("/courses", verifyToken, instructorCourses)
		instructorRoutes.PUT("/course/:courseID/publish", verifyToken, publishCourse)
	}
	studentRoutes := r.Group("/student")
	{
		studentRoutes.POST("/register", studentRegister)
		studentRoutes.POST("/login", studentLogin)
		studentRoutes.GET("/course/:courseID/enroll", verifyToken, checkEnrollCourse)
		studentRoutes.POST("/course/:courseID/enroll", verifyToken, enrollCourse)
		studentRoutes.GET("/courses", verifyToken, studentCourses)
		studentRoutes.POST("/course/:courseID/module/quiz/score", verifyToken, scoreCalculation)
	}
	r.POST("/enroll", verifyToken, enrollCourse)
	r.GET("/courses", listAllCourses)
	r.GET("/course/:courseId", getCourseDetails)
	r.GET("/course/:courseId/module/:moduleId", verifyToken, getModuleDetails)
	webapp, err := fs.Sub(static, "static")
	if err != nil {
		panic(err)
	}
	r.Use(staticHandler(webapp))
	err = r.Run("0.0.0.0:8080")
	if err != nil {
		panic("Failed to run the server")
	}
}
