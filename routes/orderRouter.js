const express = require('express');
const passport = require('passport');

const OrderService = require('../services/orderService');
const validatorHandler = require('../middlewares/validatorHandler');
const { getOrderSchema, additemSchema, createOrderSchema, deleteFileOrderSchema } = require('../schemas/orderSchema');

const router = express.Router();
const service = new OrderService();

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

router.post(
  '/add-item',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(additemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body)
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:id',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/',
  async (req, res, next) => {
    try {
      const order = await service.findAll();
      res.json(order);
    } catch (error) {
      next(error);
    }
  });


router.delete(
  '/:orderId/:fileId',
  validatorHandler(deleteFileOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { orderId } = req.body;
      const { fileId } = req.body;

      const itemsDeleted = await service.deleteItems(orderId, fileId);
      res.status(200).json(itemsDeleted);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
