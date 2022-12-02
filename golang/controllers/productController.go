package controllers

import (
	"log"
	"strconv"

	"github.com/Armando284/nodejs_vs_go_api/initializers"
	"github.com/Armando284/nodejs_vs_go_api/models"
	"github.com/gin-gonic/gin"
)

func CreateProduct(c *gin.Context) {
	type Product struct {
		Id          uint
		Title       string
		Price       float64
		Description string
	}
	var body struct {
		Product *Product
	}
	c.Bind(&body)

	product := models.Product{Id: body.Product.Id, Title: body.Product.Title, Price: body.Product.Price, Description: body.Product.Description}
	result := initializers.DB.Create(&product)
	if result.Error != nil {
		c.Status(400)
		return
	}
	c.JSON(200, gin.H{
		"product": product,
	})
}

func GetProducts(c *gin.Context) {
	var products []models.Product
	initializers.DB.Find(&products)
	c.JSON(200, gin.H{
		"products": products,
	})
}

func GetProductById(c *gin.Context) {
	id := c.Param("id")
	var product models.Product
	initializers.DB.First(&product, id)
	c.JSON(200, gin.H{
		"product": product,
	})
}

func UpdateProduct(c *gin.Context) {
	// Get id from url
	id := c.Param("id")
	// Get update data from body
	var body struct {
		Id          uint
		Title       string
		Price       float64
		Description string
	}
	c.Bind(&body)
	// Find product on database
	var product models.Product
	initializers.DB.First(&product, id)
	// Update product
	initializers.DB.Model(&product).Updates(models.Product{
		Title:       body.Title,
		Price:       body.Price,
		Description: body.Description,
	})
	// Respond updated product
	c.JSON(200, gin.H{
		"product": product,
	})
}

func DeleteProduct(c *gin.Context) {
	// Get id from url
	id := c.Param("id")
	// Delete
	initializers.DB.Unscoped().Delete(&models.Product{}, id)
	// Respond
	// Delete method doesn't return anything so respond with ok status
	c.Status(200)
}

func GetFibonacci(c *gin.Context) {
	index := c.Param("index")
	number, err := strconv.ParseUint(index, 10, 64)
	if err != nil {
		log.Fatal("Error while converting index to uint64")
	}
	response := fibonacci(number)
	c.JSON(200, gin.H{
		"response": response,
	})
}

func fibonacci(n uint64) uint64 {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}
