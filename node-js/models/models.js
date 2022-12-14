const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  connectionLimit: 5,
  database: 'node_vs_go'
});

async function CreateProduct(product) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    result = await conn.query(`INSERT INTO products (id, title, price, description) VALUES (${product.id},"${product.title}",${product.price},"${product.description}")`);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (conn) conn.end();
    return result;
  }
}

async function GetProducts() {
  let conn, result;
  try {
    conn = await pool.getConnection();
    result = await conn.query(`SELECT * FROM products`);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (conn) conn.end();
    return result;
  }
}

async function DeleteProduct(id) {
  let conn, result;
  try {
    conn = await pool.getConnection();
    result = await conn.query(`DELETE FROM products WHERE id = ${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (conn) conn.end();
    return result;
  }
}

const ProductModel = {
  CreateProduct,
  GetProducts,
  DeleteProduct
}

module.exports = ProductModel;