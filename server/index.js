require('dotenv').config();

// Server initialized
const express = require('express');
const app = express();

// CORS middleware
const cors = require('cors')
app.use(cors())

// Enable json for req and res on server
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// MongoDB's functionality.
const mongoose = require('mongoose');

// .env Variables
const port = process.env.PORT;
const connection_string = process.env.DB_CONNECTION_STRING;
const db_name = process.env.DB_NAME;

// TODO: Make it so that instead of putting action inside of the url put it in the http method.
/* Example:
*  Turn: POST http://example.com/order/1/delete
*  Into: DELETE http://example.com/order/1
*  Possible solution would be conditional checking the method and then amount of parameters. So DELETE with one parameter means delete 1 but
*  if there is POST with 15 portfolios we know to add many methods.
*  Such as if there are multiple items items in the portfolio section then we know to add many instead of one.
*/ 

// TODO: Add the ability to check if a user is authenticated to preform actions on certain portfolios or accounts.
// For this we could try setting a key which could be email + password hash and save to db and then add to local storage and pass that in requests and only do it if it works.
// Route imports
const users = require('./Routes/User');
const stocks = require('./Routes/Stocks');
const portfolio = require('./Routes/Portolio');

// Include routes to apps.
app.use('/users', users);
app.use('/stock', stocks);
app.use('/portfolio', portfolio);

// Tell server to listen on port.
app.listen(port, () => {
    // When Server Starts
    console.log(`Server Listening on Port: ${port}...`);

    mongoose.connect(connection_string)
        .then(console.log(`Connected to ${db_name}`));
})