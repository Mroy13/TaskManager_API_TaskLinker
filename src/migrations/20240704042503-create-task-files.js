'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaskFiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fileName: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      public_Key: {
        type: Sequelize.STRING,
        allowNull:false
      },
      taskId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Tasks',
          key:'id'
        },
         onDelete:'CASCADE'
      },
      fileType: {
        type: Sequelize.ENUM,
        values: ['TASKFILE', 'RESPFILE'],
        defaultValue: 'TASKFILE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TaskFiles');
  }
};