'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_favorite.init({
    userId: DataTypes.INTEGER,
    favPokemonId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_favorite',
  });
  return user_favorite;
};