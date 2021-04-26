'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_pokemon.init({
    userId: DataTypes.INTEGER,
    favPokemonId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_pokemon',
  });
  return user_pokemon;
};