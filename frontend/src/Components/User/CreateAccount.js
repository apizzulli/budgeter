import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import '../../style/default_styles.css';
import {newUser} from '../../Controllers/Requests';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreateAccount() {

    const navigate = useNavigate();
    const [ serverError, setServerError ] = useState(false);

    async function createAccount(event) {
        event.preventDefault();
        const userDTO = {
            username: event.currentTarget.form.user.value,
            password: event.currentTarget.form.password.value
        };
        const response = await newUser(userDTO);
        if(!response){
            setServerError(true);
        }else{
            navigate("/createBudget");
        }
    }

    return(
        <div className="verticalFlex">
            <h2>Enter an email and password for your account below</h2>
                <div className="verticalFlex" style={{width:'35%'}}>
                    <form className="verticalFlex" onSubmit={createAccount}>
                        <Input style={{width:'55%'}} name="user" placeholder="Email" required></Input>
                        <Input name="password" style={{marginTop:'7%',width:'55%'}} placeholder="Password" required></Input>
                        <Button onClick={createAccount} variant="outlined" style={{fontFamily:'inherit',color:'inherit', marginTop:'7%'}}>Create Account</Button>
                    </form>
                <h3 style={{display: serverError ? 'block' : 'none', color:'red'}}>Server Error - please try again</h3>
                </div>
        </div>
    )
}