import React, { Component } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from 'axios';
import { Button, FloatingLabel, Form, Row, Col, Table } from 'react-bootstrap';

export default class AddPortfolio extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            positionInput: null,
            portfolio: {}
        }
        
        this.shareNameRef = React.createRef();
        this.shareAmountRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updatePortfolio = this.updatePortfolio.bind(this);
        
    }
    

    handleClick(e){
    
    }

    handleSubmit(e){
        e.preventDefault();
        this.updatePortfolio();
        console.log(this.state.portfolio);
    }

    updatePortfolio(){
        const {portfolio} = this.state;
        const shareAmount = this.shareAmountRef.current.value;
        
        const prevState = this.state.portfolio;
        const pair = {"AAPL": shareAmount};
        
        const newState = {...prevState, ...pair};
        console.log(newState);

        this.setState({
            portfolio: {...portfolio, ...pair}
        })
    }
    
    render(){
        return(
            <div id={"AddPortfolioPrompt"} className='d-flow w-50 h-50 m-auto text-center content-center'>
                <h1>Add Portfolio</h1>
                <Table striped bordered hover variant='dark'>
                    <tbody>
                        {
                            this.state.portfolio ? Object.keys(this.state.portfolio).map(function(shareName, shareAmount) {
                                return(<tr key={shareName}>
                                        <td>{shareName}</td>
                                        <td>{shareAmount}</td>
                                    </tr>)
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
                    { this.state.positionInput }
                    <Button variant='success' type='submit' className='m-2 mt-4'>Add Position</Button>
                    <Button variant='danger' className='m-2 mt-4'>Add Portfolio</Button>
                </Form>
            </div>
        )
    }
}
