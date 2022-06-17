const { User, UserSchema } = require('./userModel');
const { Category, CategorySchema } = require('./categoryModel');
const { File, FileSchema } = require('./fileModel');
const { Order, OrderSchema } = require('./orderModel');
const { OrderFile, OrderFileSchema } = require('./order-fileModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  File.init(FileSchema, File.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderFile.init(OrderFileSchema, OrderFile.config(sequelize));

  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  File.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
