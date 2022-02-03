import React, {Component} from 'react';
import firebase from "firebase/compat/app";
import axios from "axios";

class ShowPortfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null
        }

        // Create Refs
        this.tickerRef = React.createRef();

        // Bind event handlers
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();

        // Create userID token
        firebase.auth().currentUser.getIdToken()
            .then(token => {

                // Launch http request to API.
                axios({
                    method: "POST",
                    url: `http://localhost:8080/stock/`,
                    data: {
                        ticker: this.tickerRef.current.value,
                        email: firebase.auth().currentUser.email,
                        token: token
                    }
                })
                    .then(res => {
                        // res.data.data == The actual stock information. Otherwise, we get the bigger Object.
                        this.updateResults(res.data.data)
                    })
                    .catch(error => console.log(error))
            })
    }

    updateResults(results){
        this.setState({results: results});
    }



    render() {

        return (
            <div>
                {
                    // Loop through Portfolio to print all holdings.
                    // Key is set to MongoDB _id since all are unique.
                    this.props.portfolio.map(stock => {
                        return(
                            <p key={stock._id}>You own {stock.shareAmount} shares of {stock.stockSymbol}</p>
                        )
                    })
                }
                <h3>Use the form below to get a quote on a stock!</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Symbol:</label><br/>
                    <input type={"text"} ref={this.tickerRef}/>
                    <button type={"button"} onClick={this.handleSubmit}>Submit</button>
                </form>
                {
                    // If results is not null then print data. Otherwise, say no quote.
                    this.state.results ? (
                        <div className={"StockData"}>
                            <div className={"currentPrice"}>Current Price: ${this.state.results["c"]}</div>
                            <div className={"change"}>Daily Change: ${this.state.results["d"]}</div>
                            <div className={"percentChange"}>Daily Percent Change: {this.state.results["dp"]}%</div>
                            <div className={"high"}>Daily High: ${this.state.results["h"]}</div>
                            <div className={"low"}>Daily Low: ${this.state.results["l"]}</div>
                            <div className={"open"}>Open Price: ${this.state.results["o"]}</div>
                        </div>
                    ) : (<h3>No Quote Available</h3>)
                }
            </div>
        );
    }
}

export default ShowPortfolio;