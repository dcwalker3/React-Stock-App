import React, { Component } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from 'axios';
import AddPortfolio from './AddPortfolio';

/*
* Description: The class is in charge of portfolio management
* Props: None
*/
export default class Portfolio extends Component {
    state = {
        user: firebase.auth().currentUser,
        portfolio: null,
    }

    componentDidMount(){
        this.getPortfolio();
    }

    updatePortfolio(data){
        this.setState({portfolio: data});
    }


    // Get portfolio positions from API.
    getPortfolio(){
        this.state.user.getIdToken()
            .then(token => {
                axios({
                    method: 'POST',
                    url: 'http://localhost:8080/portfolio/getByEmail',
                    data: {
                        email: this.state.user.email,
                        token: token
                    }
                })
                .then(res => {
                    if(res.status === 205){
                        this.updatePortfolio(false)
                    } else {
                        this.updatePortfolio(res.data);
                    }

                })
                .catch(err => console.log(err))
        })
    }
    
    render() {
        if(this.state.portfolio !== null){
            return <PathHandler portfolio={this.state.portfolio}/>
        }
        else{
            return <></>
        }
    }
}

export class PathHandler extends Component{
    constructor(props){
        super(props)
        
        this.state = {}
    }
    render(){
        if(this.props.portfolio === false) {
            return <AddPortfolio/>
        }
        else return <ShowPortfolio portfolio={this.props.portfolio}/>
    }
}


export class ShowPortfolio extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }
    
    render(){
        return(
            <div>
                <h1>Hello World!</h1>
                {
                    this.props.portfolio.map(stock => {
                        return(
                            <p key={stock._id}>You own {stock.shareAmount} shares of {stock.stockSymbol}</p>
                        )
                    })
                }
            </div>
        )
    }
}