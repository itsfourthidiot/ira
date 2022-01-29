package main

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func main() {
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
	err = r.Run("localhost:8080")
	if err != nil {
		panic("Failed to run the server")
	}
}
