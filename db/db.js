const Sequelize = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(process.env.database,process.env.username, process.env.password, {           //config databae,username and password 
//     dialect: 'postgres'                                                                                       //dialect for type of database used
//  });


const sequelize= new Sequelize(process.env.database,process.env.username,process.env.password,{
    dialect : 'postgres'
})


 
 sequelize.authenticate()
     .then(() => {
       
         console.log('Connection has been established successfully.');
     })
     .catch(err => {
         console.error('Unable to connect to the database:', err);
     });
 
 module.exports=sequelize;