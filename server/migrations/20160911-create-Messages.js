'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderEmailId: {
        type: Sequelize.STRING
      },
      receiverEmailId: {
        type: Sequelize.STRING
      },
      messageType: {
        type: Sequelize.STRING
      },
      vMessageURL: {
        type: Sequelize.STRING
      },
      vMessagePublicId: {
        type: Sequelize.STRING
      },
       status: {
        type: Sequelize.STRING
      }, 
       location: {
        type: Sequelize.STRING
      },     
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      vMessageThumb: {
        type: Sequelize.STRING
      }    
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Connections');
  }
};