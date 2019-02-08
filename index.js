const express = require('express');
const app = express();
const user =require('./router/user')
const jwt =  require('jsonwebtoken');
const dotenv=require('dotenv').config();






app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/user',user)



app.get('/',async (req, res) => {
    const a=token('Hello');
    res.send(a)
    })
   

app.listen(3000, console.log('connected to port 3000'))