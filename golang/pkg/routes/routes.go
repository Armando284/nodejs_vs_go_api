package routes

import (
	"github.com/Armando284/nodejs_vs_go_api/pkg/controllers"
	"github.com/gorilla/mux"
)

var RegisterRoutes = func(router *mux.Router) {
	router.HandleFunc("/api/get_products_with_taxes/{tax}", controllers.GetProductsWithTaxes).Methods("GET")
}
