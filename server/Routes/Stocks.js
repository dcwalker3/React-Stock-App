const express = require('express');
const router = express.Router();

const axios = require('axios');

require('dotenv').config();
// API key to finnhub.
const apiKey = process.env.FINNHUB_API_KEY;


router.get('/', ((req, res) => {
    res.send('Hello World');
}));

// Get basic stock information
router.get('/quote/', ((req, res) => {
    // Launch axios request.
    axios
        .get(`https://finnhub.io/api/v1/quote?symbol=${req.body.ticker}&token=${apiKey}`)
        .then(function (response) {
            // Send response data.
            res.status(200).json({data: response.data});
        })
        .catch(function (error) {
            // Send error information.
            res.status(404).json({error: error})
        })
}));

module.exports = router;