const express = require('express');
const User = require("../Schemas/User.schema");
const router = express.Router();

router.get("/", (req, res) => {
    User.find({})
        .then(results => res.status(200).json(results))
        .catch(error => res.status(404).json({error: error}))
})

router.post('/add', (req, res) => {
    // Create User
    const user = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });

    // Save User
    user.save(function (err) {

        // If there is an error.
        if(err){
            // If duplicate entry error.
            // error code 11000 can be others involving key indexing, but this is the most common.
            if (err.code === 11000){
                res.status(500).json("User already exist!");
            }

            // Other errors.
            res.status(404).json({
                error: err,
                body: req.body
            });
        }
        // No errors then all clear.
        else {
            return res.status(200).json(`User ${user.email} Added!`)
        }
    })
});

module.exports = router;