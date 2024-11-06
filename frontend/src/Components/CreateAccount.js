import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

export default function CreateAccount() {
    const createAccount = (event) => {
        event.preventDefault();
        const userDTO = {
            username: event.currentTarget.user.value,
            password: event.currentTarget.password.value
        };
        fetch('http://localhost:8080/createAccount',
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
    }
    return(
        <div>
            <h2>Enter an email and password for your account below</h2>
                <div style={{width:'15%'}}>
                    <form onSubmit={createAccount}>
                        <Input name="user" placeholder="Email" required></Input>
                        <Input name="password" style={{marginTop:'3%'}} placeholder="Password" required></Input>
                        <Button type = "submit" variant="outlined" style={{marginTop: '3%',color: 'white'}}>Create Account</Button>
                    </form>
                </div>
        </div>
    )
}