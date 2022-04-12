const express = require('express');
const faker = require('faker');
const Faker = require('faker/lib');

// console.log("My app");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params; //solo recoge le id de todos los params
  res.json({
    id,
    name: 'Product 2',
    price: 2000,
  });
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parametros');
  }
});

app.get('/categories/:categoryId/products/:prodcutId', (req, res) => {
  const { categoryId, prodcutId } = req.params;
  res.json({
    categoryId,
    prodcutId,
  });
});

app.listen(port, () => {
  console.log('mi port' + port);
});
