package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB
var secretKey []byte

func verifyToken(c *gin.Context) {
	token, err := c.Cookie("iraUserCookie")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cookie not found",
		})
		return
	}
	_, err = validateToken(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "user unauthorized",
		})
	}
	c.Set("token", token)
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
	err = DB.AutoMigrate(&Instructor{})
	if err != nil {
		panic("Unable to create tables")
	}

	// Create routes using gin-gonic and run the server
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.POST("/instructor/register", instructorRegister)
	r.POST("/instructor/login", instructorLogin)
	r.Use(verifyToken)
	r.POST("/instructor/logout", instructorLogout)
	err = r.Run("localhost:8080")
	if err != nil {
		panic("Failed to run the server")
	}
}
