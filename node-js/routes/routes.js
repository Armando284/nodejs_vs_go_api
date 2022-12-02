const express = require('express');
const router = express.Router();

const productController = require('../controllers/controller')

router.get('/', (req, res) => {
  console.log('GET /');
  res.send('Hola mundo');
});

router.post('/api/create_product', (req, res) => {
  console.log('POST /api/create_product');
  productController.CreateProduct(req, res);
});

router.get('/api/get_products', (req, res) => {
  console.log('GET /api/get_products');
  productController.GetProducts(req, res);
});

router.delete('/api/delete_product/:id', (req, res) => {
  console.log('DELETE /api/delete_product');
  productController.DeleteProduct(req, res);
})

router.get('/api/fibonacci/:index', (req, res) => {
  console.log('GET /fibonacci');
  productController.GetFibonacci(req, res);
})

module.exports = router;