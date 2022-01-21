import React, { Component } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from 'axios';

export default class Portfolio extends Component {
    state = {
        user: firebase.auth().currentUser,
        portfolio: null
    }

    componentDidMount(){
        this.getPortfolio();
    }

    updatePortfolio(e){
        this.setState({portfolio: e});
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
            if(res.data === "No Portfolio Found!"){
                this.updatePortfolio(false)
            } else {
                this.updatePortfolio(res.data);
            }
        })
        .catch(err => console.log(err))
    }
    
    render() {
        return( 
            <div>
                {
                  this.state.portfolio ? (<ShowPortfolio portfolio={this.state.portfolio}/>) : (<AddPortfolioPrompt/>)
                }
            </div>
        )
    }
}

export class AddPortfolioPrompt extends Component{
    render(){
        return(
            <div id={"AddPortfolioPrompt"}>
                <h1>Add Portfolio</h1>
            </div>
        )
    }
}


export class ShowPortfolio extends Component{
    render(){
        return(<h1>You have A Portfolio</h1>)
    }
}