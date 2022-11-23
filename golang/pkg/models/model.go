package models

import (
	"github.com/Armando284/nodejs_vs_go_api/pkg/config"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

type Product struct {
	gorm.Model
	Id          int     `json:"id"`
	Title       string  `json:"title"`
	Price       float64 `json:"price"`
	Description string  `json:"description"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Product{})
}

func GetAllProducts() []Product {
	var Products []Product
	db.Find(&Products)
	return Products
}
