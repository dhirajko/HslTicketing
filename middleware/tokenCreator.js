const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports.token= (payload)=>{

    
    return jwt.sign(payload,process.env.JWT_PRIVATE_KEY)

    
}
