'use strict';
module.exports = (sequelize, DataTypes) => {
  const Generated = sequelize.define('generated', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    image_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    format: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      unique: true
    },
    hash: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      unique: true
    },
    url_ref: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    secure_url_ref: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    underscored: true,
    freezeTableName: true
  });
  Generated.associate = function(models) {
    // associations can be defined here
  };
  return Generated;
};