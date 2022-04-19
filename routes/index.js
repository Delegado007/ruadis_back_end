const express = require('express');

const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const usersRouter = require('./usersRouter');
const orderRouter = require('./orderRouter');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); //creando un end point global para todas las rutas
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
