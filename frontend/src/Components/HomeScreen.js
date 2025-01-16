import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useContext } from 'react';
import { BudgetContext } from '../App.js';
import LoginForm from '../Components/User/LoginForm';

export default function HomeScreen() {

    const navigate = useNavigate();
    const [ noUser, setNoUser ] = useState(false);
    const { budgets, setBudgets } = useContext(BudgetContext);
    const { userId, setUserId } = useContext(BudgetContext);

    return(
        <div style={{marginTop:'10%', display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems:'center'}}>
            <h1>Hello! Welcome to Budgeter.</h1>
            <h3>By Anthony Pizzulli.</h3>
            { 
                userId == null ? 
                (<LoginForm/>)
                :
                (<div className='verticalFlex'>
                    <Button variant='outlined' style={{color:'white'}}>View Budgets</Button>
                    <Button variant='outlined'style={{color:'white'}}>Create New Budget</Button>
                    <Button variant='outlined'style={{color:'white'}}>Log a transaction</Button>
                </div>)
            }
            <br></br>
        </div>
    )
}