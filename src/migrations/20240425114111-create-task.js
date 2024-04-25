'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TaskName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      Description: {
        type: Sequelize.STRING
      },
      Deadline: {
        type: Sequelize.DATE,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM({
          values: ['CREATED', 'COMPLETED' ,'INPROGRESS','OVERDUE'],
          defaultValue: 'CREATED'
        }),
        allowNull:false
      },
      AssignedBy: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      AssignedTo: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      TaskResponse: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Tasks');
  }
};