const boom = require('@hapi/boom');
const { User } = require('../db/models/userModel');

const { models } = require('./../libs/sequelize')

class OrderService {
  constructor() { }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'user'
        },
        'items'
      ]
    });
    return order;
  }

  async addItem(data) {
    const newItem = await models.OrderFile.create(data);
    return newItem;
  }

  async findAll() {
    const orders = await models.Order.findAll({
      include: [
        {
          association: 'user'
        },
        'items'
      ]
    })
    orders.map(item => {
      delete item.user.dataValues.password
      delete item.user.dataValues.recoveryToken
    })

    return orders;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    })
    return orders;
  }


  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async deleteItemOrder(id, fileId) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'user'
        },
        'items'
      ]
    });
    console.log(order)
    return { id };
  }
}

module.exports = OrderService;
