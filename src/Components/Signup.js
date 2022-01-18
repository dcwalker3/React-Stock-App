import React, {useRef, useState} from 'react';
import {useAuth} from "../Context/AuthContext";
import {useHistory} from "react-router-dom";
import {Alert, Button, FloatingLabel, Form, Row, Col} from "react-bootstrap";
import { auth } from '../Services/Firebase';

function Signup() {
    const fNameRef = useRef();
    const lNameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();

    const { signup, deleteAccount, currentUser } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const axios = require('axios');

    async function handleSubmit(e){
        e.preventDefault()

        setError("")

        if(passRef.current.value !== confirmPassRef.current.value){
            setError("Passwords do not match")
        }

        try {
            while(error === ""){

                setLoading(true);
                await signup(emailRef.current.value, passRef.current.value)
                await axios.post("http://localhost:8080/users/add",
                    {
                        "email": emailRef.current.value,
                        "first_name": fNameRef.current.value,
                        "last_name": lNameRef.current.value
                    },{
                        "Content-Type": "application/json"
                    })
                    .catch(error => {
                        if(error.response.status === "500"){
                            setError("This email is already in use!")
                        }
                        else{
                            console.log(error.response.status)
                        }
                        deleteAccount(currentUser.uid);
                    })
                history.push("/");
            }
        } catch {
            if(error === ""){
                setError("Failed to Log In")
        
            }
        }
        setLoading(false);
    }

    return (
        <div id={"SignUp"} className={"FormInput"}>
            <Form className={"w-50 m-auto"} onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <Form.Group controlId={"NameInput"}>
                    <Row>
                        <Col>
                            <FloatingLabel 
                                className={"InputFloatingLabel"}
                                label={"First Name"}
                            >
                                <Form.Control type={"text"} placeholder={"First Name"} ref={fNameRef} required/>    
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                className={"InputFloatingLabel"}
                                label={"Last Name"}
                            >
                                <Form.Control type={"text"} placeholder={"Last Name"} ref={lNameRef} required/>
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId={"EmailInput"}>
                    <FloatingLabel
                        className={"InputFloatingLabel"}
                        label={"Email"}
                    >
                        <Form.Control type={"email"} placeholder={"email@provider.com"} ref={emailRef} required/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group controlId={"PasswordInput"}>
                    <FloatingLabel
                        className={"InputFloatingLabel"}
                        label={"Password"}
                    >
                        <Form.Control type={"password"} placeholder={"Password123"} ref={passRef} required/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group controlId={"ConfirmPasswordInput"}>
                    <FloatingLabel
                        className={"InputFloatingLabel"}
                        label={"Confirm Password"}
                    >
                        <Form.Control type={"password"} placeholder={"Password123"} ref={confirmPassRef} required/>
                    </FloatingLabel>
                </Form.Group>
                <Button type={"submit"} variant={"dark"} disabled={loading} className={"m-auto submitButton"}>
                    Submit
                </Button>
            </Form>
            {error && <Alert variant={"danger"}>{error}</Alert> }
        </div>
    );
}

export default Signup;