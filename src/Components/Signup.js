import React, {useRef, useState} from 'react';
import {useAuth} from "../Context/AuthContext";
import {useHistory} from "react-router-dom";
import {Alert, Button, FloatingLabel, Form} from "react-bootstrap";

function Signup() {
    const emailRef = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();

    const { signup } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

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
                    .catch(error => {
                        if(error.message === "EMAIL_EXISTS"){
                            setError("This email is already in use!");
                        }
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