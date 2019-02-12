const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/db')

const TicketDetail = sequelize.define('ticketLogs', {
    phoneNumber: {
        type: Sequelize.STRING,
        required: true
    },
    userId: {
        type: Sequelize.STRING
    },
    ticketTypeId: {
        type: Sequelize.STRING,
        required: true
    },
    customerTypeId: {
        type: Sequelize.STRING,
        required: true
    },

    regionId: {
        type: Sequelize.STRING,
        required: true
    },    ticketId: {
        type: Sequelize.STRING(1024),
        required: true
    },
    validFrom: {
        type: Sequelize.STRING,
    },
    
    validityPeriod : {
        type : Sequelize.STRING
    }


  })

//TicketDetail.sync();                      // for creating table initally


function validateTicketLogs(details) {

    schema = {
        phoneNumber:Joi.string().required(),
        userId: Joi.string(),
        ticketTypeId: Joi.string().required(),
        customerTypeId: Joi.string().required(),
        regionId: Joi.string().required(),
        ticketId: Joi.string(),
        validFrom: Joi.string(),
        validityPeriod : Joi.number().min(1).max(60)
        } 
  
    return Joi.validate(details, schema);
  
  }
 exports.TicketDetail=TicketDetail;
exports.ValidateTicketLogs=validateTicketLogs;