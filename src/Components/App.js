// Downgraded to 5.2.0 version of react-router-dom, so I could use switch and Redirect.
// TODO: Find solution to use react-router-dom v6 without redirect.
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// Custom Components.
import {AuthProvider} from "../Context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Signup from "./Signup";

// BootStrap Import
import 'bootstrap/dist/css/bootstrap.min.css';

// StyleSheet Import
import "../StyleSheets/Forms.css";
import "../StyleSheets/Index.css";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
          <AuthProvider>
              <Switch>
                  <PrivateRoute exact path={"/"} component={Dashboard}/>
                  <Route path={"/home"} component={Home}/>
                  <Route path={"/login"} component={Login}/>
                  <Route path={"/signup"} component={Signup}/>
                  <Route path={"/forgot_password"} component={ForgotPassword}/>
              </Switch>
          </AuthProvider>
      </Router>
    </div>
  );
}

function Home(){
        return(
            <h1>Not a Secret.</h1>
        )
}



export default App;
