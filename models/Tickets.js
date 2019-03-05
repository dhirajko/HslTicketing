const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/db')

const TicketsSchema=function(sequelize,DataTypes ) {
    return sequelize.define('tickets', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      ticketTypeId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      customerTypeId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      regionId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ticketId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      validFrom: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: sequelize.fn('now')
      },
      validityPeriod: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'tickets'
    });
  };


Tickets=TicketsSchema(sequelize,Sequelize);
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