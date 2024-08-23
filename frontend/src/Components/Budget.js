import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../style/budget_style.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useContext, useState, useEffect } from 'react';

function BudgetObj(category, amount){
    this.category = category;
    this.amount = amount;
}
export const CATEGORIES ={
    GROCERY: "Grocery",
    DISCR: "Discretionary",
    SAVINGS: "Savings",
    PHONE: "Phone",
    INTERNET: "Internet"
}

export default function Budget(){
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ budgetCreated, setBudgetCreated ] = useState(false);
    const[ menuOpen, setMenuOpen ] = useState(false);
    const [ category, setCategory ] = useState("Category");
    let open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget.innerHTML);
        setMenuOpen(true);
    };

    const menuClick = (chosenCategory) => {
        setCategory(chosenCategory);
        setAnchorEl(null);
        setMenuOpen(false);
    }

    const submit = (event)=> {
        let category = event.currentTarget.form.category.value;
        let amount = event.currentTarget.form.amount.value;
        setBudgetCreated(true);
        let newBudget = new BudgetObj(category, amount);
        console.log("Category = "+category + " Amount = "+amount);
        fetch('http://localhost:8080/createBudget',
                {
                    headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                    method: "POST",
                    body: JSON.stringify(newBudget)
                })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }
    return(
        <div style={{width: '100vw'}}>
            <h1>Create Your Budget</h1>
            <div style={{display: budgetCreated ? 'none': 'block'}} className="form-container">
                <form >
                    <h2>Fill out information</h2>
                    <div style={{width: '100%'}}>
                        <Menu anchorEl={anchorEl} open={menuOpen}>   
                            <MenuItem onClick={()=>menuClick(CATEGORIES.GROCERY)}>Grocery</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.DISCR)}>Discretionary</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.SAVINGS)}>Savings</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.PHONE)}>Phone</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.INTERNET)}>Internet</MenuItem>
                        </Menu>
                        <h3 style={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
                            {category}
                            <ArrowDropDownIcon style={{display: anchorEl === null ? 'block': 'none'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
                            <ArrowDropUpIcon style={{display:anchorEl === null ? 'none': 'block'}}onClick={()=>setAnchorEl(null)}></ArrowDropUpIcon>
                        </h3>
                    </div>
                        <div class="input-container"> 
                            <Input name="category" sx={{width: 200}} placeholder="Category" required></Input>
                            <Input name="amount" sx={{width: 200}} placeholder="Amount" required></Input>
                        </div>
                    <Button onClick={submit} variant = "outlined" style={{color:'white', marginTop:"5%"}}>Create Budget</Button>
                </form>
            </div>
            <div style={{display: budgetCreated ? 'block' : 'none'}}>
                <h2>Budget created successfully!</h2>
                <Button variant="outlined" style={{color:'white'}} onClick={()=> setBudgetCreated(false)}>Create new budget</Button>
            </div>
        </div>
    );
}