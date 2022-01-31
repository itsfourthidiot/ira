package main

import (
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

type authClaims struct {
	jwt.StandardClaims
	Email string `json:"email"`
}

func generateToken(user User) (string, error) {
	email := user.getUserDetails()
	token := jwt.NewWithClaims(jwt.SigningMethodHS512, authClaims{
		StandardClaims: jwt.StandardClaims{
			Subject:   email,
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
		},
		Email: email,
	})
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func validateToken(tokenString string) (string, error) {
	var claims authClaims
	token, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})
	if err != nil {
		return "", err
	}
	if !token.Valid {
		return "", errors.New("invalid token")
	}
	email := claims.Email
	return email, nil
}
