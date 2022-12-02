const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/routes');
const productModel = require('./models/models');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on: http://localhost:${PORT}`);
});

app.use('/', api);

productModel.TestBD().then(data => {
  console.log(data)
})