# HslTicketing
 This is small api for purchasing hsl ticket after loging into the application. You can also log all the the purchase that 
 you have made. The feature included are :
 
 1. regiseter with unique email and login 
    used api : authchecker as middleware
                POST request on '/api/user' for registering user
                POST request' on /api/login' for loging in
 2. Purchasing ticket form HSL 
              POST request  '/api/purchase'for Purchasing 
              GET request '/api/purchase'for log of all ticket purchased 
 
 3. Use of PostgreSQL with Sequelize ORM tools for database and defining models
 
 4. Others : bcrypt for encryption of password, JSONwebtoken, joi for validation of data.
 
  The sensetive file are saved in .env file and retrived using process.env.____ example api key of HSL
 
 
 
