'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Task,{
        foreignKey:'taskId',
      });
    }
  }
  TaskFile.init({
    fileName: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false

    },
    public_Key:{
      type:DataTypes.STRING,
      allowNull:false
    } ,
    taskId:{
      type:DataTypes.INTEGER,
    } ,
    fileType:{
      type: DataTypes.ENUM({
        values: ['TASKFILE', 'RESPFILE'],
        defaultValue: 'TASKFILE'
      }),

    } 
  }, {
    sequelize,
    modelName: 'TaskFile',
  });
  return TaskFile;
};