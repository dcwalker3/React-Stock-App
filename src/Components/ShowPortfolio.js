import React, {Component} from 'react';

class ShowPortfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                {
                    this.props.portfolio.map(stock => {
                        return(
                            <p key={stock._id}>You own {stock.shareAmount} shares of {stock.stockSymbol}</p>
                        )
                    })
                }
            </div>
        );
    }
}

export default ShowPortfolio;