package main

import (
	"github.com/Armando284/nodejs_vs_go_api/initializers"
	"github.com/Armando284/nodejs_vs_go_api/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.Product{})
}
