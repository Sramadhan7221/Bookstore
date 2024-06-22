'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Books.hasMany(models.BookFiles, {
        foreignKey: 'bookId',
        as: 'bookFiles'
      });
    }
  }
  Books.init({
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    slug: DataTypes.STRING,
    cover: DataTypes.STRING,
    author: DataTypes.STRING,
    release_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};