import "../../style/navbar_style.css";
import Button from '@mui/joy/Button';
import { Outlet, Link } from "react-router-dom";
import { useState, useContext } from 'react';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { BudgetContext } from '../../App.js';

export default function NavBar(){
    const [ anchorEl, setAnchorEl ] = useState(null);
    const { lightMode, setLightMode } = useContext(BudgetContext);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const closeMenu = (event) => {
        setAnchorEl(null);
    }

    window.addEventListener('mouseup', function(e) {
        var x = document.querySelector('#navBarMenu');
        console.log("s");
        if (e.target != document.querySelector(".menuItem") && Boolean(anchorEl)) {
            closeMenu();
        }
    });

    return(
            <div className="horizontalFlex" style={{width:'100%', height:'5%', borderBottom: '.02rem solid', borderBottomColor:'white'}}>
                <Button variant="text"><Link to="/">Home</Link></Button>
                <Button variant="text"> <Link to="/calendar-view">Calendar</Link></Button>
                <Button onClick={openMenu} variant="text" style={{color:'white'}}>Budgets</Button>
                <div id="navBarMenu" style={{width: '100%', marginTop:'1%'}}>
                    <Menu id="navBarMenu" anchorEl={anchorEl} open={Boolean(anchorEl)}  anchorOrigin={{vertical:'bottom'}}>   
                        <MenuItem className="menuItem" onClick={closeMenu} ><Link style={{color:'black'}} to="/viewBudgets">View Existing Budgets</Link></MenuItem>
                        <MenuItem className="menuItem" onClick={closeMenu}><Link style={{color:'black'}} to="/createBudget">Create New Budget</Link></MenuItem>
                        <MenuItem  className="menuItem" onClick={closeMenu}><Link style={{color:'black'}} to="/transactions">Transactions</Link></MenuItem>
                    </Menu>
                </div>
                <div className="horizontalFlex" style={{fontSize:'12pt',float:'right',marginRight:'1%'}}>
                    {lightMode ? "Light Mode" : "Dark Mode" }
                    <ToggleOffIcon onClick={()=>{setLightMode(true)}} style={{display: lightMode ? 'none': 'block'}}></ToggleOffIcon>
                    <ToggleOnIcon onClick={()=>{setLightMode(false)}} style={{color:'grey',display: lightMode ? 'block' : 'none' }}></ToggleOnIcon>
                </div>
            </div>
    );
}