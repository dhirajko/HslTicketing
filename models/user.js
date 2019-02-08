const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/db')



const User = sequelize.define('user', {
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
User.token=process.env.JWT_PRIVATE_KEY;


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