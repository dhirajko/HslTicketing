
const jwt = require('jsonwebtoken')
require('dotenv').config();


function auth(req, res, next) {
    const token = req.header('X-user');
    if (!token) return res.status(401).send('Assess denied. No token provied')

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);         //get the payload of the token termed as user
        req.user = decoded;   
               
        next();

    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}

module.exports = auth;