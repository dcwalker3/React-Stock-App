import React, { Component } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from 'axios';
import { Button, FloatingLabel, Form, Row, Col, Table } from 'react-bootstrap';
import AddPortfolio from './AddPortfolio';


/*
* Description: The class is in charge of portfolio management
* Props: None
*/
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
                  this.state.portfolio ? (<ShowPortfolio portfolio={this.state.portfolio}/>) : (<AddPortfolio/>)
                }
            </div>
        )
    }
}


export class ShowPortfolio extends Component{
    state = this.props;
    
    render(){
        return({
            
        })
    }
}