'use strict';
const { FileSchema, FILE_TABLE } = require('./../models/fileModel');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(FILE_TABLE, 'size', {
      field: 'size',
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(FILE_TABLE, 'size')
  }
};
