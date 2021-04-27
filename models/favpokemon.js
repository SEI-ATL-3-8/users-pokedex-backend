'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favPokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      models.favPokemon.belongsToMany(models.user, {through: 'user_favorite'})
    }
  };
  favPokemon.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favPokemon',
  });
  return favPokemon;
};