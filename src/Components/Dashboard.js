import React, {useEffect, useState} from 'react';
import {useAuth} from "../Context/AuthContext";
import Portfolio from "./Portfolio";
import * as react from "@testing-library/react";
import ReactDOM from "react-dom";

function Dashboard(props) {
    return (
        <div id={"Dashboard"}>
            <Portfolio/>
        </div>
    );
}

export default Dashboard;