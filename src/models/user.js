'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Task,{
        foreignKey:'AssignedTo',
        as: 'tasksAssignedTo',
        onDelete:'CASCADE'
      });

      this.hasMany(models.Task,{
        foreignKey:'AssignedBy',
        as: 'tasksAssignedBy',
        onDelete:'CASCADE'
      });

    }
  }
  User.init({
    UserName: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,

    },
    Name:{
      type:DataTypes.STRING,
      allowNull:false

    },
    email: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false,
      validate:{
        isEmail:true
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
       len:[3,50]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};