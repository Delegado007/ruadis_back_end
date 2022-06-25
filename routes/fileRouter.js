const express = require('express');

const FileService = require('../services/fileService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createFileSchema,
  updateFileSchema,
  getFileSchema,
  queryFileSchema,
} = require('../schemas/fileSchemas');

const router = express.Router();
const service = new FileService();

router.get('/',
  validatorHandler(queryFileSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

router.get('/filter', (req, res, next) => {
  try {
    res.send('Yo soy un filter');
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getFileSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params; //solo recoge le id de todos los params
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createFileSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getFileSchema, 'params'),
  validatorHandler(updateFileSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const fileUpdated = await service.update(id, body);
      res.json(fileUpdated);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
