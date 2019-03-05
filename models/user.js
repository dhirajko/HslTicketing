const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/db')

const userSchema=function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
       email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users'
  });
};

const User=userSchema(sequelize,Sequelize);
// User.sync()



function validateUser(user) {

  schema = {
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()

  }

  return Joi.validate(user, schema);

}



exports.User = User;
exports.validateUser = validateUser;