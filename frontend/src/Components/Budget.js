import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../style/budget_style.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useContext, useState, useEffect } from 'react';

function Category(name, amount){
    this.name = name;
    this.amount = amount;
}

function BudgetObj(name,amount,categories) {
    this.name = name;
    this.amount = amount;
    this.categories = categories;
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
    const [ categories, setCategories ] = useState([]);
    const [ category, setCategory ] = useState("");
    const categoryList = [];
    let open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget.innerHTML);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const menuClick = (chosenCategory) => {
        setCategory(chosenCategory);
        setAnchorEl(null);
    }

    const addCategory = (event)=> {
        let newCat = new Category(category, event.currentTarget.form.amount.value);
        let newCats = categories;
        // for (let i = 0; i < categories.length; i++) {
        //     // note: we are adding a key prop here to allow react to uniquely identify each
        //     // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        //     categoryList.push(
        //                         <div key={i} style={{width:'100%', display:'flex', columnGap:'5%', justifyContent:'center',alignItems:'center'}}>
        //                             categories[i].name + " " + categories[i].amount
        //                         </div>
        //                     );
        // }
        newCats.push(newCat);
        setCategories(newCats);
    }

    const createBudget = (event) => {
        const newBudg = new BudgetObj(event.currentTarget.form.name.value, event.currentTarget.form.amonut.value, categories);
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
        setBudgetCreated(true);
    }
    
    return(
        <div style={{width: '100vw'}}>
            <h1>Create Your Budget</h1>
            <div style={{display: budgetCreated ? 'none': 'block'}} className="form-container">
                    <h2>Fill out information</h2>
                    <form>
                        <div style={{width:'100%', display:'flex', columnGap:'5%', justifyContent:'center'}}>
                            <Input name="budget-name" sx={{width: 200}} placeholder="Budget Name" required></Input>
                            <Input name="total" sx={{width: 200}} placeholder="Total" required></Input>
                        </div>
                        <div style={{backgroundColor:'black'}}>{categories.map((category,i) => <div key={i}>{category.name}</div>)}</div>
                        <Button onClick={createBudget} variant = "outlined" style={{color:'white', marginTop:"2%"}}>Create Budget</Button>
                    </form>
                    <div style={{width: '100%', marginTop:'1%'}}>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{vertical:'bottom', horizontal:'left'}}>   
                            <MenuItem onClick={()=>menuClick(CATEGORIES.GROCERY)}>Grocery</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.DISCR)}>Discretionary</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.SAVINGS)}>Savings</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.PHONE)}>Phone</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.INTERNET)}>Internet</MenuItem>
                        </Menu>
                        <div style={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
                            <h3>Category: {category}</h3>
                            <ArrowDropDownIcon style={{display: anchorEl === null ? 'block': 'none'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
                            <ArrowDropUpIcon style={{display:anchorEl === null ? 'none': 'block'}}onClick={()=>setAnchorEl(null)}></ArrowDropUpIcon>
                        </div>
                    </div>
                    <form style={{width:'100%', display:'flex', columnGap:'5%', justifyContent:'center',alignItems:'center'}}>
                            <Input name="amount" sx={{width:200, height: 20}} placeholder="Amount" required></Input>
                            <Button onClick={addCategory} variant = "outlined" style={{color:'white'}}>Add Category</Button>
                    </form>
            </div>
            <div style={{display: budgetCreated ? 'block' : 'none'}}>
                <h2>Budget created successfully!</h2>
                <Button variant="outlined" size="large" style={{color:'white'}} onClick={()=> setBudgetCreated(false)}>Create new budget</Button>
            </div>
        </div>
    );
}