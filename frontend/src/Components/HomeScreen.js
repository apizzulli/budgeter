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
        <div className='verticalFlex' style={{marginTop:'2%', width:'100%'}}>
            <h1 style={{margin: 0}}>Welcome to Budgeter</h1>
            <h3>By Anthony Pizzulli.</h3>
            { 
                userId == null ? 
                (
                    <div style={{marginTop:'2%',width:'100%'}}>
                        <LoginForm/>
                    </div>
                )
                :
                (<div className='verticalFlex' style={{marginTop:'2%', height:'100%'}}>
                    <Button onClick={()=>{navigate("/viewBudgets")}} size='lg' variant='outlined' style={{fontFamily:'inherit',color:'inherit', marginBottom:'1%'}}>View Budgets</Button>
                    <Button onClick={()=>{navigate("/createBudgets")}} size='lg' variant='outlined'style={{fontFamily:'inherit',color:'inherit', marginBottom:'1%'}}>Create New Budget</Button>
                    <Button onClick={()=>{navigate("/addTransaction")}} size='lg' variant='outlined'style={{fontFamily:'inherit',color:'inherit'}}>Log a transaction</Button>
                </div>)
            }
            <br></br>
        </div>
    )
}