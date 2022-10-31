'use strict';
const { FileSchema, FILE_TABLE } = require('./../models/fileModel');

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.changeColumn(FILE_TABLE, 'created_at', {
      allowNull: false,
      type: Sequelize.DataTypes.DATEONLY,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(FILE_TABLE, 'created_at', {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
    })
  }
};
