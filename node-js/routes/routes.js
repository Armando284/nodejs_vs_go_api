const express = require('express');
const router = express.Router();

const productController = require('../controllers/controller')

router.get('/', (req, res) => {
  res.send('Hola mundo');
});

router.get('/addTestData', (req, res) => {
  productController.addTestData(req, res);
});

router.get('/api/get_products_with_taxes/:tax', (req, res) => {
  productController.getProductsWithTaxes(req, res);
});

module.exports = router;