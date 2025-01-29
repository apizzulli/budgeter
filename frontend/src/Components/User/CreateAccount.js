import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import '../../style/default_styles.css';
import {newUser} from '../../Controllers/Requests';
import { useNavigate } from 'react';

export default function CreateAccount() {
    const navigate = useNavigate();
    const createAccount = (event) => {
        event.preventDefault();
        const userDTO = {
            username: event.currentTarget.user.value,
            password: event.currentTarget.password.value
        };
        navigate("/createBudget");
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error(error));
    }
    return(
        <div className="verticalFlex">
            <h2>Enter an email and password for your account below</h2>
                <div style={{width:'35%'}}>
                    <form onSubmit={createAccount}>
                        <Input name="user" placeholder="Email" required></Input>
                        <Input name="password" style={{marginTop:'7%'}} placeholder="Password" required></Input>
                        <Button type = "submit" variant="outlined" style={{fontFamily:'inherit',color:'inherit', marginTop:'7%'}}>Create Account</Button>
                    </form>
                </div>
        </div>
    )
}