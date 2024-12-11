import { ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function ViewBudgets(props){

    const navigate = useNavigate();
    const location = useLocation();
    const [ budgets, setBudgets ] = useState(JSON.parse(localStorage.getItem("budgets")));

    // useEffect(()=>{
    //     setBudgets(location.state);
    // },[]);

    function click(){
        console.log("click func location.state.budgets="+location.state);
    }

    function editClick(budget){
        navigate("/editBudget", { state: { budget }, updateBudget: {updateBudgets} });
    }

    function updateBudgets(newBudgets) {
        setBudgets(newBudgets);
        localStorage.setItem("budgets",newBudgets);
    }

    const budgetView = (budget) => {
        let categories = budget.categories;
        return(
            <div>
                <h1>{budget.name + ": $" + budget.total}</h1>
                <div style={{fontSize:'18pt'}}>
                    Edit 
                    <ModeEditIcon onClick={() => editClick(budget)} style={{fontSize:'15pt', marginLeft:'6pt',marginTop:'3pt'}}></ModeEditIcon>
                </div>
                <div>
                    Categories:
                    {Object.keys(budget.categories).map((name) => <div key={name} style={{width:'100%', display:'flex', flexDirection:'column',columnGap:'5%', justifyContent:'center'}}>{name + ": $" + categories[name]}</div>)}
                </div>
            </div>
        );
    }

    return (
        <div>
            <button onClick={click}>Log</button>
            <h1>Welcome to budgets view</h1>
            <h2>Your existing budgets:</h2>
            {   
                budgets != undefined ? 
                budgets.map((budget,i) => 
                    <div key={i} style={{width:'100%', display:'flex', flexDirection:'column',columnGap:'5%', justifyContent:'center'}}>
                        {budgetView(budget)}
                    </div>
                )
                :
                <div>Sorry! No data</div>
            }
        </div>
    )
}
