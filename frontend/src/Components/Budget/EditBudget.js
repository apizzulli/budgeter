import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import '../../style/budget_style.css';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function Category(name, amount){
    this.name = name;
    this.amount = amount;
}

function BudgetObj(name,total,categories) {
    this.name = name;
    this.total = total;
    this.categories = categories;
}

export default function EditBudget(){

    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ budget, setBudget ] = useState({});
    const [ editName, setEditName ] = useState(false);
    const [ editTotal, setEditTotal ] = useState(false);
    const [ editCategories, setEditCategories ] = useState(false);

    const [ createBudgetView, toggleCreateBudgetView ] = useState(false);
    const [ categories, setCategories ] = useState([]);
    let open = Boolean(anchorEl);
    const location = useLocation();

    const updateName = (event) =>{
        event.preventDefault();
        const newName = event.currentTarget.form.budgetName.value;
        fetch(`http://localhost:8080/budgets/update/name/${1}`,{method: "PATCH", body: newName})
        .then(response=>{
            if(response.ok){
                location.state.budget.name = newName;
                setBudget(location.state.budget);
            }else{
                console.log(response.status);
            }
        });
        setEditName(false);
        //.catch(error => console.error(error));
    }

    const updateTotal = (event) =>{
        event.preventDefault();
        const newTotal = event.currentTarget.form.total.value;
        fetch(`http://localhost:8080/budgets/update/total/${1}`,{method: "PATCH", body: newTotal})
        .then(response=>{
            if(response.ok){
                location.state.budget.total = newTotal;
                setBudget(location.state.budget);
            }else{
                console.log(response.status);
            }
        });
        setEditName(false);
    }

    function updateBudget(newBudget) {
        setBudget(newBudget);
        
    }
    // const editBudget(event) => {
    //     event.preventDefault();
    //     let sum = 0;
    //     for(let i = 0; i < categories.length; i++){
    //         let s = parseInt(categories[i].amount);
    //         sum+=s;
    //     }
    //     // if(sum != event.currentTarget.form.total.value){

    //     // }
    //     /*
    //     var arr = [{key:"11", value:"1100"},{key:"22", value:"2200"}];
    //     */var object = categories.reduce((obj, item) => Object.assign(obj, { [item.name]: item.amount }), {});
    //     const newBudg = new BudgetObj(event.currentTarget.budgetName.value, event.currentTarget.total.value, object);
    //     fetch('http://localhost:8080/budgets/updateBudget',
    //     {
    //         headers: {
    //         "Accept":"application/json",
    //         "Content-Type":"application/json",
    //     },
    //         method: "POST",
    //         body: JSON.stringify(newBudg)
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error));
    //     //setcreateBudget(true);
    // }

    const nameDisplay = <h2 style={{display:'inline'}}>
                            {location.state.budget.name}
                            <ModeEditIcon onClick={()=>setEditName(true)} style={{display:'inline',fontSize:'15pt', marginLeft:'6pt',marginTop:'3pt'}}></ModeEditIcon>
                        </h2>
    const totalDisplay = <div style={{marginTop:'5%'}}>
                            <h2 style={{display:'inline'}}>Total:</h2>
                            <div style={{marginLeft:'2%', display:'inline',fontSize:'15pt'}}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(location.state.budget.total)}</div>
                            <ModeEditIcon onClick={()=>setEditTotal(true)} style={{display:'inline',fontSize:'15pt', marginLeft:'6pt',marginTop:'3pt'}}></ModeEditIcon>
                        </div>
    const categoriesDisplay = 
                            <div style={{marginTop:'5%'}}>
                                <h2 style={{display:'inline'}}>Categories</h2>
                                <ModeEditIcon onClick={()=>{setEditCategories(true)}} style={{marginLeft:'6pt',display:'inline',fontSize:'15pt'}}></ModeEditIcon>
                                {Object.keys(location.state.budget.categories).map((name) => <div key={name} style={{marginTop:'5%',width:'100%', display:'flex', flexDirection:'column',columnGap:'5%', justifyContent:'center'}}>{name + ": $" + location.state.budget.categories[name]}</div>)}
                            </div>
    const nameInput = <div>
                        <Input defaultValue={location.state.budget.name} name="budgetName" sx={{width: 200}} placeholder="Budget Name" required></Input>
                        <Button onClick={updateName} variant="outlined" style={{color:'white'}}>Save Name</Button>
                      </div>
    const totalInput = <div>
                            <Input defaultValue={location.state.budget.total} name="total" sx={{width: 200}} placeholder="Total" required></Input> 
                            <Button onClick={updateTotal} variant="outlined" style={{color:'white'}}>Save Total</Button>
                       </div>
    const categoriesInput =<div>
                           
                                {Object.keys(location.state.budget.categories).map(
                                    (name)=>(
                                    <div style={{display:'flex'}}>
                                        <Input defaultValue={name} type="text" name="catAmount" sx={{width:200, height: 20}} required></Input>
                                        <Input defaultValue={location.state.budget.categories[name]+"$"} type="text" name="catAmount" sx={{width:200, height: 20}} required></Input>
                                        <DeleteIcon></DeleteIcon>
                                    </div>
                                ))}
                                <form style={{width:'100%', display:'flex', columnGap:'5%', justifyContent:'center',alignItems:'center'}}>
                                        <Input type="text" name="catAmount" sx={{width:200, height: 20}} placeholder="Amount" required></Input>
                                        <Button variant = "outlined" style={{color:'white'}}type="submit">Add Category</Button>
                                </form>
                        </div>
    
    return(
        <div style={{width: '100vw'}}>
            <div className="form-container">
                    <form>
                        <div>{editName ? nameInput : nameDisplay}</div>
                        <div>{editTotal ? totalInput : totalDisplay}</div>
                       <div>{editCategories ? categoriesInput: categoriesDisplay}</div>
                        <Button type="submit" variant = "outlined" style={{color:'white', marginTop:"6%"}}>Save Budget</Button>
                    </form>
            </div>
        </div>
    );
}