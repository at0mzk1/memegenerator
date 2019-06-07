'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('generated', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      image_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      format: {
        type: Sequelize.CHAR(4),
        allowNull: false
      },
      hash: {
        type: Sequelize.CHAR(32),
        allowNull: false
      },
      url_ref: {
        type: Sequelize.STRING,
        allowNull: false
      },
      secure_url_ref: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('generated');
  }
};