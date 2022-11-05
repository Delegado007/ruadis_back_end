const faker = require('faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize')

const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {

  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newFile = await models.File.create(data)
    return newFile;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;

    const files = await models.File.findAndCountAll({
      offset: offset,
      limit: limit
    });
    return files;
  }

  async findOne(id) {
    const file = await models.File.findByPk(id);
    if (!file) {
      throw boom.notFound('File not found');
    }
    if (file.isBlock) {
      throw boom.conflict('File is block');
    }
    return file;
  }
  // SEARCH
  async search(params, offset, limit) {
    if (!params) {
      throw boom.notFound('no params for search');
    }
    const { count, rows } = await models.File.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${params}%`,
        }
      },
      offset: offset,
      limit: limit
    });
    return { count, rows };
  }

  async update(id, changes) {
    const file = await models.File.findByPk(id) //buscamos un file en la db con el numero id
    if (!file) {
      //si file no existe matamos la consulta con un error boom 404
      throw boom.notFound('File not found');
    }
    let fileUpdated = {}
    fileUpdated = {
      ...file.dataValues, //obtenemos los datos de objeto como tal
      ...changes, //conbinamos el producto con los cambios que recibimos
    };
    //hacemos update al file
    await models.File.update({
      ...fileUpdated
    },
      {
        where: {
          id: id
        }
      })
    return fileUpdated;
  }

  async delete(id) {
    const file = await models.File.findByPk(id)
    if (!file) {
      //si file no existe matamos la consulta con un error boom 404
      throw boom.notFound('File not found');
    }
    await models.File.destroy({
      where: {
        id: id
      }
    })
    return { id };
  }
}

module.exports = ProductsService;
