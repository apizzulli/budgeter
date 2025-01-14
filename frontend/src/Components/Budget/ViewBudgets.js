import { ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import '../../style/default_styles.css'
import BudgetDetails from "./BudgetDetails";
export default function ViewBudgets(props){

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const dateStr = (date) => { 
        let newDate = new Date(date);
        return newDate.toLocaleDateString("en-US");
    };
    
    const navigate = useNavigate();
    const location = useLocation();
    const [ budgets, setBudgets ] = useState(JSON.parse(localStorage.getItem("budgets")));
    const [ detailedView, setDetailedView ] = useState(null);

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

    function transactions(budget) {
        localStorage.setItem("selectedBudget",JSON.stringify(budget));
        navigate("/addTransactions");
    }

    function navToDetails(budget) {
        localStorage.setItem("selectedBudget",JSON.stringify(budget));
        navigate("/budgetDetails", {state: budget});
    }

    const budgetView = (budget) => {
        let categories = budget.categories;
        console.log("Budget view:\nTransactions: "+transactions[0]);
        return(
            <div style={{backgroundColor:'rgb(146, 159, 178, 0.130)',marginBottom:'4%',width:'35%'}}>
                <h2>{budget.name}<br></br>{"$"+ budget.total + " total"}</h2>
                <div>
                    <h3>Categories:</h3>
                    {Object.keys(budget.categories).map((name) => <div key={name} style={{width:'100%'}}>{name + ": $" + categories[name]}</div>)}
                    {budget.transactions.length > 0 ? 
                        (
                            <div>
                                <h3>Recent Transactions:</h3>
                                {budget.transactions.slice(0,3).map((trans) => <div style={{width:'100%'}}>{dateStr(trans.date) + ": " + trans.category + ", " + USDollar.format(trans.amount)}</div>)}
                            </div>)
                        :
                        <h3>No Recent Transactions</h3>
                    }
                    <Button variant="outlined" onClick={()=>transactions(budget)} style={{marginBottom:'5%',color:'white',marginTop:'3%'}}>Add Transactions</Button>
                </div>
            </div>
        );
    }

    return (
        <div style={{height:'100%'}}>
            <h1>Your Budgets:</h1>
            {   
                budgets != undefined ? 
                <div className="verticalFlex">
                    {
                        budgets.map((budget,i) => 
                            <div key={i} className={"verticalFlex"}>
                                {budgetView(budget)}
                            </div>)
                    }
                </div>
                :
                <div>Sorry! No data</div>
            }
        </div>
    )
}