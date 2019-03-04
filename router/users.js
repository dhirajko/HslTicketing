const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user')
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { token } = require('../middleware/tokenCreator')




router.post('/', async (req, res) => {                                      // create User

        const { error } = validateUser(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ where: { email: req.body.email } })
        if (user) return res.status(400).send('email already registered');

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const dataForUser = _.pick(req.body, ['name', 'email', 'password']);

        await User.create(dataForUser);

       const newuser = await User.findOne({ where: { email: req.body.email } });

        const dataForPayload=_.pick(newuser,['id','name','email']);


        const authToken= token(dataForPayload);
        console.log(authToken);
        
        res.header(('X-user',authToken))    
        
         res.send(dataForPayload);

   



})






module.exports = router;