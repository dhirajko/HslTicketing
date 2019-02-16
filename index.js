const express = require('express');
const app = express();
const user =require('./router/user')
const auth= require('./router/auth')
const authCheck = require('./middleware/authChecker')
const purchase= require('./router/purchse')
require('dotenv').config();






require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/purchase',purchase)
app.use('/api/user',user)
app.use('/api/login', auth)


app.get('/',authCheck,async (req, res) => {                                     //Smmple route for auth check
   
    })

app.post('/', (req,res)=>{


})
   

app.listen(3000, console.log('connected to port 3000'))