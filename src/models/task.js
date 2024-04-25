'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey:'assignedTo',
        as: 'assignedtoUser',
      });
      this.belongsTo(models.User,{
        foreignKey:'assignedBy',
        as: 'assignedbyUser',
      });
    
    }
  }
  Task.init({
    TaskName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    Description:{
      type: DataTypes.STRING,
    },
    Deadline: {
      type:DataTypes.DATE,
      allowNull:false
    },
    status:{
      type: DataTypes.ENUM({
        values: ['CREATED', 'COMPLETED' ,'INPROGRESS','OVERDUE'],
        defaultValue: 'CREATED'
      }),
      allowNull:false
    },
    AssignedBy:{
      type:DataTypes.INTEGER,
    },
    AssignedTo:{
     type:DataTypes.INTEGER,
    },
    TaskResponse:{
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};