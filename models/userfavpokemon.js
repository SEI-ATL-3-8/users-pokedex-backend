'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userFavPokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userFavPokemon.init({
    userId: DataTypes.INTEGER,
    pokemonId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userFavPokemon',
  });
  return userFavPokemon;
};