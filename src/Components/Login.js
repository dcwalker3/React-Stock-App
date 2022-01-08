import {Alert, Button, FloatingLabel, Form, FormControl} from "react-bootstrap";
import {useRef, useState} from "react";
import {useAuth} from "../Context/AuthContext";
import {Link, useHistory} from "react-router-dom";

export default function Login(){
    // Ref functions.
    const emailRef = useRef();
    const passRef = useRef();

    // Import login from firebase functionality.
    const { login } = useAuth();

    // State Initialization
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Import history from useHistory in react-router-dom.
    const history = useHistory();

    // Submit Function
    async function handleSubmit(e){
        // Prevent empty inputs.
        e.preventDefault()

        // Attempt
        try {
            // Make error equal to an empty string.
            setError("")

            // Prevent multiple submits.
            setLoading(true);

            // Try and login.
            await login(emailRef.current.value, passRef.current.value)

            // If all good return home.
            history.push("/");
        } catch {
            // Else show the error as failed to login.
            setError("Failed to Log In")
        }

        // Make loading false so we can submit.
        setLoading(false);
    }

    return (
        <div id={"Login"} className={"FormInput"}>
            <h2 className={"text-center mt-4 mb-4"}>Login</h2>
            <Form className={"w-50 m-auto"} onSubmit={handleSubmit}>
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
                <Button type={"submit"} variant={"dark"} disabled={loading} className={"m-auto submitButton"}>
                    Submit
                </Button>
            </Form>
            <p className={"mt-4"}>Don't have an account? <Link to={"/signup"}>Sign Up Here</Link></p>
            <p><Link to={"/forgot_password"}>Forgot Password?</Link></p>
            {error && <Alert variant={"danger"}>{error}</Alert> }
        </div>
    );
}
