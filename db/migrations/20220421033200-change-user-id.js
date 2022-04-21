'use strict';
const { DataTypes } = require('sequelize');

const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customerModel')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
