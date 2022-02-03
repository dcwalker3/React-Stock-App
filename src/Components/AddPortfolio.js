import React, { Component } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from 'axios';
import { Button, FloatingLabel, Form, Row, Col, Table } from 'react-bootstrap';

export default class AddPortfolio extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            email: firebase.auth().currentUser.email,
            portfolio: []
        }
        
        this.shareNameRef = React.createRef();
        this.shareAmountRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updatePortfolio = this.updatePortfolio.bind(this);
        
    }
    

    handleClick(e){
        console.log("Start Submit");
        e.preventDefault();
        console.log("Ready Request");
        firebase.auth().currentUser.getIdToken(token => {
            axios({
                method: "POST",
                url: "http://localhost:8080/portfolio/",
                data: {
                    token: token,
                    email: this.state.email,
                    portfolio: this.state.portfolio
                }
            })
                .then(() => {
                    console.log("Refresh Page");
                    window.location.reload(false);
                })
                .catch(error => console.log(error));
        })
            .then(res => console.log(res))
            .catch(error => console.error(error))
    }

    handleSubmit(e){
        e.preventDefault();
        this.updatePortfolio({
            stockSymbol: this.shareNameRef.current.value,
            shareAmount: this.shareAmountRef.current.value
        });
        this.shareAmountRef.current.value = "";
        this.shareNameRef.current.value = "";
    }

    updatePortfolio(data){
        const updatedPortfolio = [...this.state.portfolio];
        updatedPortfolio.push(data);
        this.setState({portfolio: updatedPortfolio});
    }
    
    render(){
        return(
            <div id={"AddPortfolioPrompt"} className='d-flow w-75 h-50 m-auto text-center content-center'>
                <h1>Add Portfolio</h1>
                <Table striped bordered hover variant='dark'>
                    <tbody>
                        <tr>
                            <th>Stock Symbol</th>
                            <th>Share Amount</th>
                        </tr>
                        {
                            this.state.portfolio ? this.state.portfolio.map((stock) => {
                                return(
                                    <tr key={stock.stockSymbol}>
                                        <td>{stock.stockSymbol}</td>
                                        <td>{stock.shareAmount}</td>
                                    </tr>
                                );
                            })
                            : <tr></tr>
                        }
                    </tbody>
                </Table>
                <Form id={"PositionInput"} className='w-50 text-center m-auto' onSubmit={this.handleSubmit}>
                    <Row className='m-auto'>
                        <Col>
                            <FloatingLabel
                                className={"InputFloatingLabel"}
                                label={"Stock Symbol"}
                            >
                                <Form.Control type='text' placeholder='VOO, AAPL' ref={this.shareNameRef} required/>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                className={"InputFloatingLabel"}
                                label={"Share Amount"}
                            >
                                <Form.Control type='text' placeholder='1.24, 0.8' ref={this.shareAmountRef} required/>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Button variant='success' type='submit' className='m-2 mt-4'>Add Position</Button>
                    <Button variant='danger' className='m-2 mt-4' onClick={this.handleClick}>Add Portfolio</Button>
                </Form>
            </div>
        )
    }
}
