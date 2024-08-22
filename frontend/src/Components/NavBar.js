import "../style/navbar_style.css";
import Button from '@mui/joy/Button';
import { Outlet, Link } from "react-router-dom";

export default function NavBar(){
    return(
            <div class = "navbar">
                <div class = "button-container">
                    <Button variant="text"><Link to="/">Home</Link></Button>
                    <Button variant="text"> <Link to="/calendar-view">Calendar</Link></Button>
                    <Button variant="text"> <Link to="/budgets">Budgets</Link></Button>
                </div>
            </div>
    );
}