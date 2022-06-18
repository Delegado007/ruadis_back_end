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
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { pages } = query;
    if (pages) {
      options.where.pages = pages;
    }

    const { pages_min, pages_max } = query;
    if (pages_min && pages_max) {
      options.where.pages = {
        [Op.gte]: pages_min,
        [Op.lte]: pages_max,
      };
    }

    const files = await models.File.findAll(options);
    return files;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      // -1 lo devuelve si index no existe

      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product, //obtenemos los datos de objeto como tal
      ...changes, //conbinamos el producto con los cambios que recibimos
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
