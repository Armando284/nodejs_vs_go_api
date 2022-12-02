package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Id          uint `gorm:"primaryKey" json:"id"`
	Title       string
	Price       float64
	Description string
}
