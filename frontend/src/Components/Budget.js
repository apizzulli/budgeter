import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import '../style/budget_style.css';
import { useContext, useState, useEffect } from 'react';

export default function Budget(){
    return(
        <div style={{width: '100vw'}}>
            <h1>Create Your Budget</h1>
            <div className="form-container">
                <form>
                    <h2>Fill out information</h2>
                    <div class="input-container"> 
                        <Input name="name" sx={{width: 300}} placeholder="Description" required></Input>
                        <Input sx={{width: 300}} placeholder="Notes"> </Input>
                        <Input sx={{width: 300}} placeholder="Reminder"> </Input>
                        <Input placeholder="Amount"></Input>
                    </div>
                    <Button variant = "outlined" style={{color:'white', marginTop:"5%"}}>Create Budget</Button>
                </form>
            </div>
        </div>
    );
}