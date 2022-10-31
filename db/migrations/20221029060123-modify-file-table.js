'use strict';
const { FileSchema, FILE_TABLE } = require('./../models/fileModel');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(FILE_TABLE, 'path', {
      field: 'path',
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(FILE_TABLE, 'path', FileSchema)
  }
};
