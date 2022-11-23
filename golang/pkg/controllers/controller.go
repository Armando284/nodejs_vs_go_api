package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/Armando284/nodejs_vs_go_api/pkg/models"
	"github.com/gorilla/mux"
)

var NweProduct models.Product

func GetProductsWithTaxes(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	tax := vars["tax"]
	Tax, err := strconv.ParseFloat(tax, 64)
	if err != nil {
		fmt.Println("Tax parsing error")
	}
	products := models.GetAllProducts()
	for i := 0; i < len(products); i++ {
		products[i].Price *= Tax
	}
	res, _ := json.Marshal(products)
	w.Header().Set("Content-Type", "pkglication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
