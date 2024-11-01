import "../style/navbar_style.css";
import Button from '@mui/joy/Button';
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function NavBar(){
    const [ anchorEl, setAnchorEl ] = useState(null);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const closeMenu = (event) => {
        setAnchorEl(null);
    }

    return(
            <div class = "navbar">
                <div class = "button-container">
                    <Button variant="text"><Link to="/">Home</Link></Button>
                    <Button variant="text"> <Link to="/calendar-view">Calendar</Link></Button>
                    <Button onClick={openMenu} variant="text" style={{color:'white'}}>Budgets</Button>
                    <div style={{width: '100%', marginTop:'1%'}}>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}  anchorOrigin={{vertical:'bottom'}}>   
                            <MenuItem onClick={closeMenu} ><Link style={{color:'black'}} to="/viewBudgets">View Existing Budgets</Link></MenuItem>
                            <MenuItem onClick={closeMenu}><Link style={{color:'black'}} to="/createBudget">Create New Budget</Link></MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
    );
}