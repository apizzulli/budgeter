import Input from '@mui/joy/Input';
import "../style/default_styles.css";
import Button from '@mui/joy/Button';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { useState } from 'react';

export default function Transactions() {

    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ selectedCat, setSelectedCat ] = useState("Select");
    const inputs = ["Amount", "Description", "Date"];

    const addTransaction = (form) => {
        setAnchorEl(form.currentTarget);
        // let amount = form.currentTarget.amount.value;
        // let date = form.currentTarget.date.value;
        // let desc = form.currentTarget.desc.value;
        let cats = JSON.parse(localStorage.getItem("selectedBudget")).categories;
        Object.keys(cats).forEach(cat=>console.log(cat));//.map((cat)=><MenuItem onClick={()=>selectCat(cat)}>{cat}</MenuItem>);
        console.log("1");
    }

    const handleMenuOpen =(event)=>{
        setAnchorEl(event.currentTarget.parentElement);
    }

    const menuChoice = (cat) => {
        setSelectedCat(cat);
        setAnchorEl(null);
    }

    function handleMenuClose(){}
    return(
        <div className="verticalFlex">
            <h1>Add a Transaction</h1>
            <form className="verticalFlex" onSubmit={addTransaction}>
                <div className="horizontalFlex" style={{width:'15%', marginBottom: '.5%'}}>
                    <div style={{width:'50%'}} onClick={addTransaction}>Category: </div>
                    <div className="horizontalFlex" style={{width:'50%'}}><div style={{width:'50%'}}>{selectedCat}</div>
                        <ArrowDropDownIcon style={{width:'50%',display: anchorEl === null ? 'block': 'none'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
                        <ArrowDropUpIcon style={{width:'50%',display:anchorEl === null ? 'none': 'block'}}onClick={handleMenuClose}></ArrowDropUpIcon>
                    </div>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>   
                        {Object.keys(JSON.parse(localStorage.getItem("selectedBudget")).categories).map((cat)=><MenuItem onClick={()=>menuChoice(cat)}>{cat}</MenuItem>)}
                    </Menu>
                </div>
                <div className="horizontalFlex" style={{width:'15%', marginBottom: '.5%'}}>
                    <div style={{width:'50%'}}>Amount: </div>
                    $<Input name="amount" type="text" placeholder="0.00" style={{width:'50%'}}></Input>
                </div>
                <div className="horizontalFlex" style={{width:'15%', marginBottom: '1%'}}>
                    <div style={{width:'50%'}}>Date: </div>
                    <Input type="date" name="date" style={{width:'50%'}}></Input>
                </div>
                <div className="verticalFlex" style={{width:'30%', marginBottom: '1%',height:'100% '}}>
                    <div style={{width:'50%', marginBottom:'2%'}}>Description: </div>
                    <Input name="desc" style={{width:'50%',height:'80%'}}></Input>
                </div>
                <Button type="submit" variant="outlined" style={{marginTop: '1%', color:'white', width:'5%'}}>Save</Button>
            </form>
        </div>
    )
}