const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/db')
const Tickets=require('./Tickets')



const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,    
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    autoIncrement: false,
  },
  name: {
    type: Sequelize.STRING,
    required: true
  },
  email: {
    type: Sequelize.STRING,
    required: true
  },
  password: {
    type: Sequelize.STRING(1024),
    required: true
  }
})


function validateUser(user) {

  schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()

  }

  return Joi.validate(user, schema);

}



exports.User = User;
exports.validateUser = validateUser;