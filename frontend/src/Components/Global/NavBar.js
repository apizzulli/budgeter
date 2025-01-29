import "../../style/navbar_style.css";
import Button from '@mui/joy/Button';
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { BudgetContext } from '../../App.js';

export default function NavBar(){
    const navigate = useNavigate();
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
            <div  style={{display:'flex',width:'100%', height:'5%', borderBottom: '.02rem solid', borderBottomColor:'white',justifyContent:'space-between'}}>
                <div className="horizontalFlex" style={{marginLeft:'.25%'}}>
                    <Button onClick={()=>{navigate("/")}} style={{fontFamily:'inherit',color:'inherit'}} variant="text">Home</Button>
                    <Button onClick={()=>{navigate("/calendar-view")}} style={{fontFamily:'inherit',color:'inherit'}} variant="text" href="/calendar-view"> Calendar</Button>
                    <Button onClick={openMenu} style={{fontFamily:'inherit',color:'inherit'}}  variant="text" >Budgets</Button>
                    <Menu id="navBarMenu" anchorEl={anchorEl} open={Boolean(anchorEl)}  anchorOrigin={{vertical:'bottom'}}>   
                        <MenuItem className="menuItem" onClick={closeMenu} ><Link style={{color:'black'}} to="/viewBudgets">View Existing Budgets</Link></MenuItem>
                        <MenuItem className="menuItem" onClick={closeMenu}><Link style={{color:'black'}} to="/createBudget">Create New Budget</Link></MenuItem>
                        <MenuItem  className="menuItem" onClick={closeMenu}><Link style={{color:'black'}} to="/transactions">Transactions</Link></MenuItem>
                    </Menu>
                </div>
                <div style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'row',float:'right',fontSize:'12pt', width:'10%',marginRight:'.25%'}}>
                    <div style={{marginRight:'2%'}}>{lightMode ? "Light Mode" : "Dark Mode" }</div>
                    <ToggleOffIcon onClick={()=>{setLightMode(true)}} style={{display: lightMode ? 'none': 'block'}}></ToggleOffIcon>
                    <ToggleOnIcon onClick={()=>{setLightMode(false)}} style={{color:'grey',display: lightMode ? 'block' : 'none' }}></ToggleOnIcon>
                </div>
            </div>
    );
}