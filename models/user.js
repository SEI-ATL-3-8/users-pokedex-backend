'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.favPokemon)
    }
    checkPassword(plainPassword) {
      return bcrypt.compareSync(plainPassword, this.password)
    }
  };
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  user.addHook('beforeCreate', (user, options) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10)
    user.password = hashedPassword
  })
  return user;
};