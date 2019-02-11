const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { token } = require('../middleware/tokenCreator')

router.post('/', async (req, res) => {

})





function validateTicketParam(body) {

    const schema = {
        userId: Joi.string().when('ticketTypeId', {
            is: "season",
            then: Joi.string().required()
        }),
        phoneNumber: Joi.string().required(),
        validityPeriod: Joi.number().when('ticketTypeId',{
            is: "day",
            then: Joi.number().min(1).max(7).required()
        }),
        validFrom: Joi.date(),
        ticketTypeId: Joi.string().required().valid(["single", "day", "season"]).when('customerTypeId',{
            is : "child",
            then : Joi.string().invalid('season')
        })
        ,
        customerTypeId: Joi.string().required().valid(["adult", "child"]),
        regionId: Joi.string().required().valid(["helsinki", "espooKauniainen", "vantaa", "keravaSipooTuusula", "kirkkonummiSiuntio", "regional", "bizoneRegion", "trizoneRegion"])

    }
    return Joi.validate(body, schema);
}

module.exports = validateTicketParam;