import { ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import '../../style/default_styles.css'
export default function ViewBudgets(props){

    const navigate = useNavigate();
    const location = useLocation();
    const [ budgets, setBudgets ] = useState(JSON.parse(localStorage.getItem("budgets")));

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

    const transactions = (budget) => {
        localStorage.setItem("selectedBudget",JSON.stringify(budget));
        navigate("/addTransactions");
    }
    const budgetView = (budget) => {
        let categories = budget.categories;
        return(
            <div style={{backgroundColor:'rgb(146, 159, 178, 0.130)',marginBottom:'4%',width:'35%'}}>
                <h2>{budget.name}<br></br>{"$"+ budget.total + " total"}</h2>
                <div>
                    <h3>Categories:</h3>
                    {Object.keys(budget.categories).map((name) => <div key={name} style={{width:'100%'}}>{name + ": $" + categories[name]}</div>)}
                    <Button variant="outlined" onClick={()=>transactions(budget)} style={{marginBottom:'5%',color:'white',marginTop:'3%'}}>Add Transactions</Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome to budgets view</h1>
            {   
                budgets != undefined ? 
                <div className="verticalFlex">
                    <h2>Your existing budgets:</h2>
                    {budgets.map((budget,i) => 
                        <div key={i} className={"verticalFlex"}>
                            {budgetView(budget)}
                        </div>
                    )}
                </div>
                :
                <div>Sorry! No data</div>
            }
        </div>
    )
}
