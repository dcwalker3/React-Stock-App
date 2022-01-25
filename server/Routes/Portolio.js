const express = require('express');
const router = express.Router();

const Portfolio  = require("../Schemas/Portfolio.schema");

router.get("/getAll", (req, res) => {
    Portfolio.find({})
        .then(results => res.status(200).json(results))
        .catch(error => res.status(404).json({error: error}))
})

router.post('/getByEmail', ((req, res) => {
    // Query MongoDB based off email we receive.
    Portfolio.findOne({email: req.body.email}, function (error, results) {
        // Error Handling
        if(error){
            res.status(404).json({error: error});
        }
        // Send the portfolio.
        else {
            if(results){
                res.status(200).json(results.portfolio);
            } else{
                res.status(205).send("No Portfolio Found!");
            }
        }
    })

}))

router.post('/add', (req, res) => {
    // Create Portfolio
    const portfolio = new Portfolio({
        // JSON we receive.
        email: req.body.email,
        portfolio: req.body.portfolio
    });

    // Save Portfolio
    portfolio.save(function (err) {

        // If there is an error.
        if(err){

            // If duplicate entry error.
            // error code 11000 can be others involving key indexing, but this is the most common.
            if (err.code === 11000){
                return res.status(500).json("User already has a portfolio!");
            } else{
                // Other errors.
                return res.status(404).json({error: err});
            }
        }
        // No errors then all clear.
        else {
            return res.status(200).json(`User ${portfolio.email}'s Portfolio has been Added!`)
        }
    })
});

router.delete('/delete', (req, res) => {
    Portfolio.deleteOne({email: req.body.email}, function(err){
        if(err){
            res.status(404).json({error: err});
        } else{
            res.status(200).json(`User ${req.body.email}'s portfolio has been Deleted!`)
        }

    })
    
})

module.exports = router;