const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Joi = require('joi');
const { Tickets,validateTicketParam } = require('../models/Tickets')
const fetch = require("node-fetch");
const authCheck = require('../middleware/authChecker')
require('dotenv').config();



router.post('/', authCheck, async (req, res) => {
    req.body.userId = String(req.user.id)   

    const { error } = validateTicketParam(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    var url = 'https://sales-api.hsl.fi/api/sandbox/ticket/v3';

    try {
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.APIKey
            }
        })
            .then(body => body.json())
            .then(json => console.log(json))


    
    
    // I have supposed the the ticket has response as per hsl api 
    const sample= {
        "phoneNumber": "+358501231234",
        "userId": req.user.id,
        "ticketTypeId": "season",
        "customerTypeId": "adult",
        "regionId": "helsinki",
        "ticketId": "w9dQURvLfOXMvIAXSeJCLPROuy4T5J0hOQBdFJEPYPF004",
        "validFrom": "2018-06-26T13:09:40.797Z"
      }
        
     const ticket = await Tickets.create(sample)
     res.send(ticket)  
     
    } catch (error) {
        res.send(error)
    }
})


router.get('/', authCheck, async (req, res) => {                                      // Load all the tickets that you have purchased
    const ticket = await Tickets.findAll({
        where: {
            userId: req.user.id                                                         
        }
    });
  res.send(ticket)
})

module.exports = router;