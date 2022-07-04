const Joi = require('joi'); //libreria que valida nuestros datos

const id = Joi.number().integer();
const userId = Joi.number().integer();
const orderId = Joi.number().integer();
const fileId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  userId: userId.required(),
});

const deleteFileOrderSchema = Joi.object({
  orderId: orderId.required(),
  fileId: fileId.required()
});

const additemSchema = Joi.object({
  orderId: orderId.required(),
  fileId: fileId.required(),
  amount: amount.required(),
});

module.exports = { getOrderSchema, createOrderSchema, additemSchema, deleteFileOrderSchema };
