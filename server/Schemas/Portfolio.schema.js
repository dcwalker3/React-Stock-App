const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSchema = new Schema({
    stockSymbol: {
        type: String,
        required: true
    },
    shareAmount: {
        type: String,
        required: true
    }
})

const PortfolioSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    // Portfolio should be a json object of stock holdings.
    /*
     * i.e.
     * portfolio: {
     *  "AAPL": 2.6,
     *  "MSFT": 1.3
     * }
     */
    portfolio: {
        type: [subSchema],
        required: true
    }
}, {timestamps: true});


const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;