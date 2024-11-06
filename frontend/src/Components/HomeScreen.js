import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import {useEffect} from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 


export default function HomeScreen() {
    const navigate = useNavigate();
    const login = (event) => {
        event.preventDefault();
        let user = event.currentTarget.user.value;
        let pass =  event.currentTarget.password.value;
        const userDTO = {
            username: event.currentTarget.user.value,
            password: event.currentTarget.password.value
        };
        fetch('http://localhost:8080/login',
        {
            headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
            method: "POST",
            body: JSON.stringify(userDTO)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
        navigate("/viewBudgets");
    }
    return(
        <div style={{marginTop:'10%', display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems:'center'}}>
            <h1>Hello! Welcome to Budgeter.</h1>
            <h3>By Anthony Pizzulli.</h3>
            <br></br>
            <h2>Enter credentials below to login.</h2>
            <div style={{width:'15%'}}>
                <form onSubmit={login}>
                    <Input name="user" placeholder="Username" required></Input>
                    <Input name="password" style={{marginTop:'3%'}} placeholder="Password" required></Input>
                    <Button type = "submit" variant="outlined" style={{marginTop: '3%',color: 'white'}}>Login</Button>
                </form>
            </div>
            <h3>Don't have an account? <a href="/createAccount">Create one here.</a></h3>
        </div>
    )
}