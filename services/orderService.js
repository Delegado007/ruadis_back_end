const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize')

class OrderService {
  constructor() { }

  async create(data) {
    const user = await models.User.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })
    console.log(user)
    if (!user) {
      throw boom.badRequest('Customer not found');
    }
    const newOrder = await models.Order.create({
      userId: user.id
    });
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return [];
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

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          include: ['user']
        },
        'files'
      ]
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
