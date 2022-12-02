const productModel = require('../models/models');

// Add json serializer to bigint
BigInt.prototype.toJSON = function () { return this.toString() }

// Add test data to DB
async function CreateProduct(req, res) {
  const product = req.body.product;
  try {
    const response = await productModel.CreateProduct(product);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    throw error;
  }
}

async function GetProducts(req, res) {
  const tax = req.params.tax || 1;
  try {
    const result = await productModel.GetProducts();
    const response = result.filter(product => !!product.id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
    throw error;
  }
}

async function DeleteProduct(req, res) {
  const id = req.params.id;
  try {
    const response = await productModel.DeleteProduct(id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
    throw error;
  }
}

// Non Optimized Fibonacci
async function GetFibonacci(req, res) {
  const index = req.params.index;
  const fibonacci = n => {
    if (n <= 1) return n;

    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  const response = await fibonacci(index);
  res.status(200).json(response);
}

const ProductController = {
  CreateProduct,
  GetProducts,
  DeleteProduct,
  GetFibonacci,
}

module.exports = ProductController;