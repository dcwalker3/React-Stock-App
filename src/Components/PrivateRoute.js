import { useAuth } from "../Context/AuthContext";
import {Redirect, Route} from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest}){
    // Create access to AuthContext, so we can see if someone is logged.
    const { currentUser } = useAuth();

    return(
        <Route
            // Pass the rest of the props to the route.
            {...rest}

            // Pass the props to use in the Component.
            render={props => {
                // If currentUser is not null then show the component we have with props passed.
                // Else redirect to /login.
                return currentUser ? <Component {...props} /> : <Redirect to={"/login"}/>
            }}
        ></Route>
    )
}