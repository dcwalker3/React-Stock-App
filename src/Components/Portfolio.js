import React, { Component } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from 'axios';
import AddPortfolio from './AddPortfolio';
import ShowPortfolio from "./ShowPortfolio";

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

        // Create userID Token.
        this.state.user.getIdToken()
            .then(token => {

                // Launch Request using token.
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
            // Return empty tag if there is no portfolio.
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
