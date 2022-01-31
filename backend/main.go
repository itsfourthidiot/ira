package main

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB
var secretKey []byte

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
	_, err := validateToken(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "user unauthorized",
		})
	}
	c.Next()
}

func main() {
	//load env variables
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}
	secretKey = []byte(os.Getenv("SECRET_KEY"))

	// Connect to the database using GORM
	_db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	}
	DB = _db
	err = DB.AutoMigrate(
		&Instructor{},
		&Student{},
	)
	if err != nil {
		panic("Unable to create tables")
	}

	// Create routes using gin-gonic and run the server
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.POST("/instructor/register", instructorRegister)
	r.POST("/instructor/login", instructorLogin)
	r.POST("/student/register", studentRegister)
	r.POST("/student/login", studentLogin)
	r.Use(verifyToken)
	err = r.Run("0.0.0.0:8080")
	if err != nil {
		panic("Failed to run the server")
	}
}
