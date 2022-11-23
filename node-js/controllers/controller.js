const productModel = require('../models/models');
const testData = require('../testData');

// Add test data to DB
async function AddTestData(req, res) {
  await testData.forEach(async data => {
    try {
      const response = await productModel.createProduct(data);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  })
}

async function GetProductsWithTaxes(req, res) {
  const tax = req.params.tax || 1;
  try {
    const result = await productModel.getProducts();
    const response = result.filter(product => !!product.id);
    response.forEach((product) => product.price *= tax);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
    throw error;
  }
}

const ProductController = {
  addTestData: AddTestData,
  getProductsWithTaxes: GetProductsWithTaxes
}

module.exports = ProductController;