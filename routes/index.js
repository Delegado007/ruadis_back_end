const express = require('express');

const fileRouter = require('./fileRouter');
const categoriesRouter = require('./categoriesRouter');
const usersRouter = require('./usersRouter');
const orderRouter = require('./orderRouter');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); //creando un end point global para todas las rutas
  router.use('/files', fileRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);

}

module.exports = routerApi;
