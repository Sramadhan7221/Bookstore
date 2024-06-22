'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookFiles.belongsTo(models.Books, {
        foreignKey: 'bookId',
        as: 'book'
      })
    }
  }
  BookFiles.init({
    bookId: DataTypes.INTEGER,
    bookFile: DataTypes.STRING,
    totalPage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookFiles',
  });
  
  return BookFiles;
};