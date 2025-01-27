import { useState } from 'react';
import '../../style/default_styles.css';
import Button from '@mui/joy/Button';
import Card from '@mui/material/Card';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SavingsIcon from '@mui/icons-material/Savings';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shop } from '@mui/icons-material';

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const percent = new Intl.NumberFormat('default', {
    style: 'percent'
  });

export default function ViewTransactions() {

    const navigate = useNavigate();
    const location = useLocation();
    const [ transactions, setTransactions ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).transactions);
    const [ remainingVals, setRemainingVals ] = useState(JSON.parse(localStorage.getItem("remainingVals")));
    const budgetName = useState(JSON.parse(localStorage.getItem("selectedBudget")).name);

    function pickIcon(category) {
        let ret = null;
        switch(category){
            case "Groceries":
                ret = <ShoppingCartIcon></ShoppingCartIcon>;
                break;
            case "Internet":
                ret = <WifiIcon></WifiIcon>;
                break;
            case "Savings":
                ret = <SavingsIcon></SavingsIcon>;
                break;
            case "Phone":
                ret = <LocalPhoneIcon></LocalPhoneIcon>;
                break;
        }
        return ret;
    }
    const spendCard = (val,i) => {
        let name = Object.keys(val)[0];
        let percentage = Object.values(val)[0];
        let icon = pickIcon(name);
        let textColor = "green";
        if(percentage*100 >= 70){
            textColor = "red";
        }else if(percentage >=50){
            textColor = "orange";
        }else if(percentage >= 30){
            textColor = "yellow";
        }  
        return  <Card variant="outlined" key={"card"+i} className='verticalFlex' style={{fontSize:'large',backgroundColor:'#ffffff9e',color:`${textColor}`,width:'15%', height:'100%'}}>
                    <div>{icon}</div>
                    <div>{percent.format(percentage)} spent</div>
                </Card>;
    }

    const dateStr = (date) => { 
        let newDate = new Date(date);
        return newDate.toLocaleDateString("en-US");
    };

    return(
        <div className='verticalFlex' style={{width:'100%', height:'100%'}}>
            <h1>{budgetName}</h1>
            <div className='horizontalFlex' style={{columnGap:'3%',width:'70%', height:'25%'}}>
                {
                    remainingVals.map((val, i)=>
                        spendCard(val,i)
                    )
                }
            </div>
            <h2>Transactions:</h2>  
            <div style={{height:'75%',width:'100%'}}>
                {transactions.map((trans) => <div >{dateStr(trans.date) + ": " + trans.category + ", " + USDollar.format(trans.amount)}</div>)}
                <Button variant="outlined" onClick={()=>navigate("/addTransaction")} style={{color:'white', marginTop:'1%'}}>Add New Transaction</Button>
            </div>
        </div>
    );
}