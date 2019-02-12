const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Joi = require('joi');
const { TicketDetail } = require('../models/ticketsLogs')
const fetch = require("node-fetch");
const authCheck = require('../middleware/authChecker')


router.post('/',authCheck, async (req, res) => {                                                  // for purchasing tickets
    const { error } = validateTicketParam(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    var url = 'https://sales-api.hsl.fi/api/ticket/v3/order';

    try {
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.APIKey
            }
        })
        const json = await result.json();

        const ticket = await TicketDetail.create(json);      

        res.send(ticket);

    } catch (error) {
        res.send(error)
    }
})

router.get('/', authCheck,async (req, res) => {                                         // find all the tickets that you have purchased
   
    const ticket = await TicketDetail.findAll({where : {
            userId : req.user.id
    }});
    res.send(ticket);
})




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
        })
        ,
        customerTypeId: Joi.string().required().valid(["adult", "child"]),
        regionId: Joi.string().required().valid(["helsinki", "espooKauniainen", "vantaa", "keravaSipooTuusula", "kirkkonummiSiuntio", "regional", "bizoneRegion", "trizoneRegion"])

    }
    return Joi.validate(body, schema);
}

module.exports = router;