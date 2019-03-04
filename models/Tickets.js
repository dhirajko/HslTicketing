const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/db')
const User = require('./user')

const Tickets = sequelize.define('Tickets', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,    
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
    phoneNumber: {
        type: Sequelize.STRING,
        required: true
    },
    userId: {
        type: Sequelize.INTEGER       
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
    },

    ticketId: {
        type: Sequelize.STRING(1024),
        required: true
    },
    validFrom: {
        type: Sequelize.STRING,
    },

    validityPeriod: {
        type: Sequelize.STRING
    }
})

Tickets.associate=(models)=>{
    Tickets.hasOne(models.User, {foreignKey: 'id', as: 'userId'})
}
//Tickets.sync()

function validateTicketParam(body) {
    const schema = {
        userId: Joi.string().when('ticketTypeId', {
            is: "season",
            then: Joi.string().required()
        }),

        phoneNumber: Joi.string().required(),

        validityPeriod: Joi.number().when('ticketTypeId', {
            is: "day",
            then: Joi.number().min(1).max(7).required()
        }),

        validFrom: Joi.date(),
        ticketTypeId: Joi.string().required().valid(["single", "day", "season"]).when('customerTypeId', {
            is: "child",
            then: Joi.string().invalid('season')
        }),

        customerTypeId: Joi.string().required().valid(["adult", "child"]),
        regionId: Joi.string().required().valid(["helsinki", "espooKauniainen", "vantaa", "keravaSipooTuusula", "kirkkonummiSiuntio", "regional", "bizoneRegion", "trizoneRegion"])

    }
    return Joi.validate(body, schema);

}
exports.Tickets = Tickets;
exports.validateTicketParam = validateTicketParam;