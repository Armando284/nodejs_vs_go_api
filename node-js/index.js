const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mariadb = require('mariadb');
const testData = require('./testData').testData;

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on: http://localhost:${PORT}`);
});

const pool = mariadb.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  connectionLimit: 5,
  database: 'node_vs_golang'
});

// Add test data to DB
async function addTestData() {
  let conn;
  try {
    conn = await pool.getConnection();
    testData.forEach(async data => {
      try {
        await conn.query(`INSERT INTO \`products\`(\`id\`, \`title\`, \`price\`, \`description\`) VALUES (${data.id},"${data.title}",${data.price},"${data.description}")`)
      } catch (error) {
        console.log(error);
      }

    })
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (conn) return conn.end();
  }

}

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.get('/api/addTestData', async (req, res) => {
  await addTestData();
  res.send('done')
});

app.get('/api/get_products_with_taxes/:tax', async (req, res) => {
  const tax = req.params.tax || 2.5;
  console.log('tax', tax);
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM products");
    let response = result.filter(product => !!product.id);
    response.forEach((product) => product.price *= tax);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
    throw error;
  } finally {
    if (conn) return conn.end();
  }
});