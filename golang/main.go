package main

import (
	"github.com/Armando284/nodejs_vs_go_api/controllers"
	"github.com/Armando284/nodejs_vs_go_api/initializers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	r.POST("/api/create_product", controllers.CreateProduct)
	r.PUT("/api/update_product/:id", controllers.UpdateProduct)
	r.GET("/api/get_products", controllers.GetProducts)
	r.GET("/api/get_product/:id", controllers.GetProductById)
	r.DELETE("/api/delete_product/:id", controllers.DeleteProduct)
	r.GET("/api/fibonacci/:index", controllers.GetFibonacci)

	r.Run()
}
