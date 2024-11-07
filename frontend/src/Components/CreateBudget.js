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

function BudgetObj(name,total,categories) {
    this.name = name;
    this.total = total;
    this.categories = categories;
}

export const CATEGORIES ={
    GROCERY: "Grocery",
    DISCR: "Discretionary",
    SAVINGS: "Savings",
    PHONE: "Phone",
    INTERNET: "Internet"
}

export default function CreateBudget(){

    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ createBudgetView, toggleCreateBudgetView ] = useState(false);
    const [ categories, setCategories ] = useState([]);
    const [ menuItem, setMenuItem ] = useState("Select");
    let open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget.parentElement);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const menuClick = (chosenCategory) => {
        setMenuItem(chosenCategory);
        setAnchorEl(null);
    }

    const addCategory = (event)=> {
        const amount = event.currentTarget.catAmount.value;
        event.preventDefault();
        let newCat = new Category(menuItem, amount);
        let newCats = categories;
        newCats.push(newCat);
        setCategories(newCats);
        setMenuItem("Select");
        event.target.reset();
    }

    const createBudget = (event) => {
        event.preventDefault();
        let sum = 0;
        for(let i = 0; i < categories.length; i++){
            let s = parseInt(categories[i].amount);
            sum+=s;
        }
        // if(sum != event.currentTarget.form.total.value){

        // }
        /*
        var arr = [{key:"11", value:"1100"},{key:"22", value:"2200"}];
        */var object = categories.reduce((obj, item) => Object.assign(obj, { [item.name]: item.amount }), {});

        
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
    //useEffect(()=>{},[categories]) // this will solve your issue 
    const getBudget = () =>{
        fetch(`http://localhost:8080/getBudget/${1}`)
        .then(response => response.json())
        .then(data => console.log(data));
    }

    function setCreateBudgetView(){
        toggleCreateBudgetView(true);
    }
    function setViewBudgetView(){
        toggleCreateBudgetView(false);
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
                        {categories.map((cat,i) => <div key={i} style={{width:'100%', display:'flex', flexDirection:'column',columnGap:'5%', justifyContent:'center'}}>{cat.name + ": $" + cat.amount}</div>)}
                        <Button type="submit" variant = "outlined" style={{color:'white', marginTop:"2%"}}>Create Budget</Button>
                    </form>
                    <div style={{width: '100%', marginTop:'1%'}}>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>   
                            <MenuItem onClick={()=>menuClick(CATEGORIES.GROCERY)}>Grocery</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.DISCR)}>Discretionary</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.SAVINGS)}>Savings</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.PHONE)}>Phone</MenuItem>
                            <MenuItem onClick={()=>menuClick(CATEGORIES.INTERNET)}>Internet</MenuItem>
                        </Menu>
                        <div style={{display: 'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
                            <div style={{display: 'flex', alignItems:'center'}}>
                                <h3>{"Category: "+menuItem}</h3>
                                <ArrowDropDownIcon style={{display: anchorEl === null ? 'block': 'none'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
                                <ArrowDropUpIcon style={{display:anchorEl === null ? 'none': 'block'}}onClick={handleMenuClose}></ArrowDropUpIcon>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={addCategory} style={{width:'100%', display:'flex', columnGap:'5%', justifyContent:'center',alignItems:'center'}}>
                            <Input type="text" name="catAmount" sx={{width:200, height: 20}} placeholder="Amount" required></Input>
                            <Button variant = "outlined" style={{color:'white'}}type="submit">Add Category</Button>
                    </form>
            </div>
            {/* <div style={{display: createBudget ? 'block' : 'none'}}>
                <h2>Budget created successfully!</h2>
                <Button variant="outlined" size="large" style={{color:'white'}} onClick={()=> setcreateBudget(false)}>Create new budget</Button>
            </div> */}
        </div>
    );
}