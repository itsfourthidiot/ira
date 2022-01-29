package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// Student registration
func studentRegister(c *gin.Context) {
	// Parse input request
	type Req struct {
		Email    string `json: "email"`
		Password string `json: "password"`
	}
	req := Req{}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	// Check if the student with email already exists
	existingStudent := Student{}
	result := DB.Where("email = ?", req.Email).First(&existingStudent)
	if result.RowsAffected == 1 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "user with email already exists",
		})
		return
	}
	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "interval server error",
		})
		return
	}
	// Insert into database
	newStudent := Student{
		Email:    req.Email,
		Password: string(hashedPassword),
	}
	result = DB.Create(&newStudent)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "internal server error",
		})
		return
	}
	c.JSON(http.StatusOK, newStudent)
}

// Student login
func studentLogin(c *gin.Context) {
	type Req struct {
		Email    string `json: "email"`
		Password string `json: "password"`
	}
	req := Req{}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "incorrect parameters",
		})
		return
	}
	// Check if the student exists
	student := Student{}
	res := DB.Where("email = ?", req.Email).First(&student)
	if res.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "user not found",
		})
		return
	}
	// Check if the password match
	err = bcrypt.CompareHashAndPassword([]byte(student.Password), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "wrong password",
		})
		return
	}
	token, err := generateToken(student)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.SetCookie("iraUserCookie", token, 60*60*24, "/", "localhost", false, true)
	c.JSON(http.StatusOK, student)
}

// Instructor logout
func studentLogout(c *gin.Context) {
	token, ok := c.Get("token")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "user unauthorized",
		})
		return
	}
	c.SetCookie("iraUserCookie", token.(string), -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{
		"message": "user logged out successfully",
	})
}
