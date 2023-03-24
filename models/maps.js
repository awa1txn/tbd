'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Maps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Maps.init({
    battlefieldName: DataTypes.STRING,
    isArchive: DataTypes.BOOLEAN,
    map: DataTypes.ARRAY(DataTypes.STRING),
    players: DataTypes.ARRAY(DataTypes.STRING),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Maps',
  });
  return Maps;
};