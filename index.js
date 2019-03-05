const express = require('express');
const app = express();
const user =require('./router/users')
const auth= require('./router/auth')
const authCheck = require('./middleware/authChecker')
const tickets= require('./router/tickets')
const {Tickets}=require('./models/Tickets')
require('dotenv').config();







app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/tickets',tickets)
app.use('/api/user',user)
app.use('/api/auth', auth)




app.get('/', authCheck, (req,res)=>{                                               //auth check route
     console.log(req.user);
        
    res.send("check")
})

app.post('/', authCheck,async (req,res)=>{                                               //auth check route
   
   res.send("This is auth check of Post")
})

app.listen(3000, console.log('connected to port 3000'))