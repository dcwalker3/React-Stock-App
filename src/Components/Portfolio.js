import React, { Component } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from 'axios';
import AddPortfolio from './AddPortfolio';
import LoadingScreen from './LoadingScreen';


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

    updateLoading(){
        const newState = !Boolean(this.state.loading);
        this.setState({loading: newState})
    }

    // Get portfolio positions from API.
    getPortfolio(){
        axios({
            method: 'POST',
            url: 'http://localhost:8080/portfolio/getByEmail',
            data: {
                email: this.state.user.email
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
        .finally(this.updateLoading());
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