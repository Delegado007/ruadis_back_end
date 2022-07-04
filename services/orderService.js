const boom = require('@hapi/boom');
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

  async deleteItemOrder(orderId, fileId) {
    const fileInOrder = await models.OrderFile.findAll({
      where: {
        orderId: orderId,
        fileId: fileId
      }
    });
    if (!fileInOrder) {
      //si file en orden no existe matamos la consulta con un error boom 404
      throw boom.notFound('File in order not found');
    }
    return { fileInOrder };
  }

  async deleteItems(orderId, fileId) {
    const resp = await models.OrderFile.destroy({
      where: {
        orderId: orderId,
        fileId: fileId
      }
    });
    if (resp === 0) {
      throw boom.notFound('Nothing for delete, File in order not found');
    }
    return { resp };
  }

}

module.exports = OrderService;
