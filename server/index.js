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