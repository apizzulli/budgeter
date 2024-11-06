import { ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export default function ViewBudgets(props){

    const location = useLocation();
    const [ budgets, setBudgets ] = useState([]);

    
    useEffect(()=>{
        fetch(`http://localhost:8080/getBudgets/${location.state.userId}`)
        .then(response => response.json())
        .then(data => setBudgets(data.data.budgets))
        .catch(error => console.error(error));
    });
    function click(){
        console.log(location.state);
    }

    // if(!userId){
    //     return(<div>No user id!</div>)
    // }

    return (
        <div>
            <button onClick={click}>click</button>
            <h1>Welcome to budgets view</h1>
            <h2>Your existing budgets:</h2>
            {budgets.map((budget,i) => <div key={i} style={{width:'100%', display:'flex', flexDirection:'column',columnGap:'5%', justifyContent:'center'}}>{budget.name + ": $" + budget.total}</div>)}
        </div>
    )
}
