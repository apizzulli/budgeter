import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CategoryForm from './CategoryForm';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../style/budget_style.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useContext, useState, useEffect } from 'react';

function BudgetObj(name,total,categories) {
    this.name = name;
    this.total = total;
    this.categories = categories;
}

export default function CreateBudget(){

    const [ savedCategories, saveCategories ] = useState([]);

    const createBudget = (event) => {
        event.preventDefault();
        let sum = 0;
        // for(let i = 0; i < categories.length; i++){
        //     let s = parseInt(categories[i].amount);
        //     sum+=s;
        // }
        // // if(sum != event.currentTarget.form.total.value){
        let object = savedCategories.reduce((obj, item) => Object.assign(obj, { [item.name]: item.amount }), {});
        const newBudg = new BudgetObj(event.currentTarget.budgetName.value, event.currentTarget.total.value, object);
        fetch('http://localhost:8080/createBudget',
        {
            headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
            method: "POST",
            body: JSON.stringify(newBudg)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
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
                    <form onSubmit={createBudget}>
                        <div style={{width:'100%', display:'flex', columnGap:'5%', justifyContent:'center'}}>
                            <Input name="budgetName" sx={{width: 200}} placeholder="Budget Name" required></Input>
                            <Input name="total" sx={{width: 200}} placeholder="Total" required></Input>
                        </div>
                        <h3>Categories</h3>
                        {savedCategories.map((cat) => <div style={{width:'100%', display:'flex', flexDirection:'column',columnGap:'5%', justifyContent:'center'}}>{cat.name + ": $" + cat.amount}</div>)}
                        <Button type="submit" variant = "outlined" style={{color:'white', marginTop:"2%"}}>Create Budget</Button>
                    </form>
                    <CategoryForm savedCategories={savedCategories} saveCategories={saveCategories}></CategoryForm>
            </div>
        </div>
    );
}