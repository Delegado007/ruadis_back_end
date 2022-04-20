'use strict';

const { UserSchema, USER_TABLE } = require('./../models/userModel')

module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
    // se pueden correr muchas modificaciones aqui
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'role')
  }
};
