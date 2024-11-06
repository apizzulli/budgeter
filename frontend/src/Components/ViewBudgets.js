import { ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Button from '@mui/joy/Button';

export default function ViewBudgets(props){

    const location = useLocation();
    const [ budgets, setBudgets ] = useState([]);

    
    useEffect(()=>{
        fetch(`http://localhost:8080/getBudgets/${location.state.userId}`)
        .then(response => response.json())
        .then(data => setBudgets(data))
        .catch(error => console.error(error));
    });
    function click(){
        console.log(budgets);
    }

    const budgetView = (budget) => {
        let categories = budget.categories;
        return(
            <div>
                <h1>{budget.name + ": $" + budget.total}</h1>
                <Button></Button>
                <div>
                    Categories:
                    {Object.keys(budget.categories).map((name) => <div key={name} style={{width:'100%', display:'flex', flexDirection:'column',columnGap:'5%', justifyContent:'center'}}>{name + ": $" + categories[name]}</div>)}
                </div>
            </div>
        );
    }

    return (
        <div>
            <button onClick={click}>click</button>
            <h1>Welcome to budgets view</h1>
            <h2>Your existing budgets:</h2>
            {budgets.map((budget,i) => 
                <div key={i} style={{width:'100%', display:'flex', flexDirection:'column',columnGap:'5%', justifyContent:'center'}}>
                    {budgetView(budget)}
                </div>)}
        </div>
    )
}
