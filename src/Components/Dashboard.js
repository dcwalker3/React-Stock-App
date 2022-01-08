import React, {Component} from 'react';
import {useAuth} from "../Context/AuthContext";

class Dashboard extends Component {

    render() {
        return (
            <div id={"Dashboard"}>
                {this.props.user}
            </div>
        );
    }
}

export default Dashboard;