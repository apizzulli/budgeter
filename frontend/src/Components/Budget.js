import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../style/budget_style.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useContext, useState, useEffect } from 'react';

function BudgetObj(category, amount){
    this.category = category;
    this.amount = amount;
}

export default function Budget(){
    const [anchorEl, setAnchorEl] = useState(null);
    let open = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget.innerHTML);
    };
    const submit = (event)=> {
        let category = event.currentTarget.form.category.value;
        let amount = event.currentTarget.form.amount.value;
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
            <div className="form-container">
                <form>
                    <h2>Fill out information</h2>
                    <div class="menu">
                        <Menu anchorEl={anchorEl} open={open}>   
                            <MenuItem>Category</MenuItem>
                        </Menu>
                        <div style={{width:'50%'}}>
                            Category
                            <ArrowDropDownIcon style={{display:anchorEl ? 'none': 'block'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
                            <ArrowDropUpIcon style={{display:anchorEl ? 'block': 'none'}}onClick={()=>setAnchorEl(false)}></ArrowDropUpIcon>
                        </div>
                    </div>
                        <div class="input-container"> 
                            <Input name="category" sx={{width: 300}} placeholder="Category" required></Input>
                            <Input name="amount" sx={{width: 300}} placeholder="Amount" required></Input>
                        </div>
                    <Button onClick={submit} variant = "outlined" style={{color:'white', marginTop:"5%"}}>Create Budget</Button>
                </form>
            </div>
        </div>
    );
}