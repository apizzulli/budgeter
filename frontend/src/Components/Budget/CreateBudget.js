import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CategoryForm from '../Global/CategoryForm';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../../style/budget_style.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { newBudget } from '../../Controllers/Requests.js';
import { BudgetContext } from '../../App.js';

function BudgetObj(name,total,categories) {
    this.name = name;
    this.total = total;
    this.remaining = total;
    this.categories = categories;
    this.transactions = null;
}

export default function CreateBudget(){

    const navigate = useNavigate();
    const [ savedCategories, saveCategories ] = useState([]);
    const [ serverFail, setServerFail ] = useState(false);
    const { budgets, setBudgets } = useContext(BudgetContext);
    const { userId, setUserId } = useContext(BudgetContext);

    async function createBudget (event) {
        event.preventDefault();
        let object = savedCategories.reduce((obj, item) => Object.assign(obj, { [item.name]: item.amount }), {});
        const newBudg = new BudgetObj(event.currentTarget.budgetName.value, event.currentTarget.total.value*1, object);
        let userId = localStorage.getItem("userId");
        const response = await newBudget(userId, newBudg);
        console.log("response in comp = "+response);
        if(!response){
            setServerFail(true);
        }
        else{
            budgets.push(response.budget);
            setBudgets(budgets);
            navigate("/viewBudgets");
        }
        //setcreateBudget(true);
    }

    const getBudget = () =>{
        fetch(`http://localhost:8080/getBudget/${1}`)
        .then(response => response.json())
        .then(data => console.log(data));
    }

    return(
        <div style={{width: '100vw'}}>
            <div  className="form-container">
                <h1>Create New Budget</h1>
                    <form onSubmit={createBudget}>
                        <div style={{width:'100%', display:'flex', columnGap:'5%', justifyContent:'center'}}>
                            <Input name="budgetName" sx={{width: 200}} placeholder="Budget Name" required></Input>
                            <Input name="total" sx={{width: 200}} placeholder="Total" required></Input>
                        </div>
                        <h3>Categories</h3>
                        {savedCategories.map((cat) => <div style={{width:'100%', display:'flex', flexDirection:'column',columnGap:'5%', justifyContent:'center'}}>{cat.name + ": $" + cat.amount}</div>)}
                        <Button type="submit" variant = "outlined" style={{fontFamily:'inherit',color:'inherit',marginTop:"2%"}} >Create Budget</Button>
                    </form>
                    <CategoryForm savedCategories={savedCategories} saveCategories={saveCategories}></CategoryForm>
            </div>
            <h3 style={{visibility: serverFail ? "visible" : "hidden", color:"#f55656", fontWeight:'bolder', fontSize:'xxl', marginTop:'4%'}}>Server failure, please try again</h3>
        </div>
    );
}