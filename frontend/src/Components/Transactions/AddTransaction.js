import Input from '@mui/joy/Input';
import "../../style/default_styles.css";
import Button from '@mui/joy/Button';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { createTransaction } from '../../Controllers/Requests';
import { useState, useContext } from 'react';
import { BudgetContext } from '../../App.js';

export default function Transactions() {

    const budgetNames = JSON.parse(localStorage.getItem("selectedBudget"));
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ anchorElB, setAnchorElB ] = useState(null);
    const [ selectedCat, setSelectedCat ] = useState("Select");
    const [ budget, setBudget ] = useState(JSON.parse(localStorage.getItem("selectedBudget")));
    const { userId, setUserId } = useContext(BudgetContext);

    const inputs = ["Amount", "Description", "Date"];

    function Transaction(category,amount,date, description) {
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    async function addTransaction(event){
        // event.preventDefault();
        // setAnchorEl(event.currentTarget);
        //let newTrans = new Transaction(selectedCat, document.getElementById("amountInput").value, document.getElementById("dateInput").value, document.getElementById("descInput").value);
    //    / let newBudg = await createTransaction((JSON.parse(localStorage.getItem("selectedBudget"))).id, newTrans);
        //localStorage.setItem("selectedBudget",newBudg);
    }

    const handleMenuOpen =(event)=>{
        setAnchorEl(event.currentTarget.parentElement);
    }

    const menuChoice = (cat) => {
        setSelectedCat(cat);
        setAnchorEl(null);
    }

    const budgetMenu = () => {
        return (
            <div className="horizontalFlex" style={{width:'50%'}}>
            <div>
                <div style={{width:'50%'}}>{budget != undefined ? budget.name : "None Selected"}</div>
                <ArrowDropDownIcon style={{width:'50%',display: anchorElB === null ? 'block': 'none'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
                <ArrowDropUpIcon style={{width:'50%',display:anchorElB === null ? 'none': 'block'}}onClick={handleMenuClose}></ArrowDropUpIcon>    
            </div>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>   
                    {Object.keys(budget.categories).map((cat)=><MenuItem onClick={()=>menuChoice(cat)}>{cat}</MenuItem>)}
                </Menu>
            </div>
        );
    }

    function handleMenuClose(){}
    return(
        <div className="verticalFlex">
            <h1>Add a Transaction</h1>
            <form className="verticalFlex" onSubmit={addTransaction}>
                <h2>Budget: </h2>
                <div className="horizontalFlex" style={{width:'15%', marginBottom: '.5%'}}>
                    <div style={{width:'50%'}} onClick={addTransaction}>Category: </div>
                    <div className="horizontalFlex" style={{width:'50%'}}>
                        {
                            budget.categories != undefined ? 
                            <div>
                                <div style={{width:'50%'}}>{selectedCat}</div>
                                <ArrowDropDownIcon style={{width:'50%',display: anchorEl === null ? 'block': 'none'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
                                <ArrowDropUpIcon style={{width:'50%',display:anchorEl === null ? 'none': 'block'}}onClick={handleMenuClose}></ArrowDropUpIcon>    
                            </div>
                            :
                            <div>None Available</div>
                        }
                    </div>
                    {
                        budget != undefined && budget.categories != undefined ? 
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>   
                            {Object.keys(budget.categories).map((cat)=><MenuItem onClick={()=>menuChoice(cat)}>{cat}</MenuItem>)}
                        </Menu>
                        :
                        <Menu>No Categories Available</Menu>
                        }
                </div>
                <div className="horizontalFlex" style={{width:'15%', marginBottom: '.5%'}}>
                    <div style={{width:'50%'}}>Amount: </div>
                    $<Input id="amountInput" name="amount" type="text" placeholder="0.00" style={{width:'50%'}}></Input>
                </div>
                <div className="horizontalFlex" style={{width:'15%', marginBottom: '1%'}}>
                    <div style={{width:'50%'}}>Date: </div>
                    <Input id="dateInput" type="date" name="date" style={{width:'50%'}}></Input>
                </div>
                <div className="verticalFlex" style={{width:'30%', marginBottom: '1%',height:'100% '}}>
                    <div style={{width:'50%', marginBottom:'2%'}}>Description: </div>
                    <Input id="descInput" name="desc" style={{width:'50%',height:'80%'}}></Input>
                </div>
                <Button onClick={addTransaction} variant="outlined" style={{fontFamily:'inherit',color:'inherit', marginTop:'1%', width:'5%'}}>Save</Button>
            </form>
        </div>
    )
}