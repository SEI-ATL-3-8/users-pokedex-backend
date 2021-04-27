'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('favPokemons', 'userId', { type: Sequelize.DataTypes.INTEGER })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('favPokemons', 'userId')
  }
};
