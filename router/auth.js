const express = require('express');
const router = express.Router();
const { User } = require('../models/user')
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {token}=require('../middleware/tokenCreator')




router.post('/', async (req, res) => {                                      //  Login User 

    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) return res.status(400).send('invalid user or password');

    const validPassword= await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('invalid user or password');
       
    const dataForPayload=_.pick(user,['id','name','email']);    

     const authToken= token(dataForPayload);
    
    res.header(('X-user',authToken))    
    console.log(authToken);
    
    
    res.send(dataForPayload);

})




function validateUser(user) {

    schema = {     
      email: Joi.string().required().email(),
      password: Joi.string().required()  
    }
  
    return Joi.validate(user, schema);  
  }


module.exports = router;