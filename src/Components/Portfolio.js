import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAuth} from "../Context/AuthContext";

function Portfolio(){
    const [portfolio, setPortfolio] = useState(null);
    const [user, setUser] = useState(useAuth().currentUser);



    useEffect(() => {
        const portfolio = getPortfolioPositions();


    }, [])

    function getPortfolioValue(portfolio){
        Object.entries(portfolio).forEach(
            ([key, value]) => {
                console.log(key, value)
            }
        )
    }

    async function getPortfolioPositions(){
        await axios.post('http://localhost:8080/portfolio/getByEmail',
            {
                "email": user.email
            }, {
                "Content-Type": "application/json"
            })
            .then(async response => {
                await setPortfolio(response.data);
                return response.data;
            })
            .catch(error => {
                console.error(error);
            })
    }


    return (
        <div id={"Portfolio"}>

        </div>
    );
};

export default Portfolio;