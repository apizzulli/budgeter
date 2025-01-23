import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import '../../style/budget_style.css';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { editBudget } from '../../Controllers/Requests'; 

function Category(name, amount){
    this.name = name;
    this.amount = amount;
}

function BudgetObj(id, name,total,categories) {
    this.id = id;
    this.name = name;
    this.total = total;
    this.categories = categories;
}

export default function EditBudget(){

    const navigate = useNavigate();
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ budget, setBudget ] = useState({});
    const [ serverError, setServerError ] = useState(false);
    const [ currentName, setCurrentName ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).name);
    const [ editName, setEditName ] = useState(false);

    const [ currentTotal, setCurrentTotal ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).total);
    const [ editTotal, setEditTotal ] = useState(false);
    
    const [ currentCategories, setCurrentCategories ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).categories);
    const [ editCategories, setEditCategories ] = useState(false);

    const [ createBudgetView, toggleCreateBudgetView ] = useState(false);

    let open = Boolean(anchorEl);
    const location = useLocation();

    function nameDone() {
        setEditName(false);
        setCurrentName(document.getElementById("nameInput").value);
    }

    function totalDone() {
        setEditTotal(false);
        setCurrentTotal(document.getElementById("totalInput").value);
    }

    function categoriesDone() {
        setEditCategories(false);

    }

    async function saveBudget(event) {
        event.preventDefault();
        console.log("editing...");
        let budgId = JSON.parse(localStorage.getItem("selectedBudget")).id;
        let budgTotal = JSON.parse(localStorage.getItem("selectedBudget")).total;
        let newTotal = currentTotal;
        if(budgTotal == currentTotal){
            newTotal = -1;
        }
        const editedBudget = new BudgetObj(budgId, currentName, currentTotal, currentCategories);
        const response = await editBudget(editedBudget, budgId);
        let budgets = JSON.parse(localStorage.getItem("budgets"));
        if(response){
            for(let i = 0; i < budgets.length; i++){
                console.log("In foreach");
                if(budgets[i].id == budgId){
                    budgets[i] = response;
                    console.log("matches, changing");
                }
            }
            localStorage.setItem("budgets",JSON.stringify(budgets));
            navigate(-1);
            console.log("response");
        }else{
            setServerError(true);
        }
    }

    const nameDisplay = <div className='horizontalFlex' style={{width:'20%'}} >
                            <div className='horizontalFlex' style={{width:'100%',justifyContent:'space-between'}}>
                                <h2 >Name:</h2>
                                {editName && !editTotal && !editCategories ? 
                                    <div className='horizontalFlex'>
                                        <Input id="nameInput" defaultValue={currentName} name="budgetName" sx={{width: 200}} placeholder="Budget Name" required></Input>
                                        <Button onClick={nameDone} variant="outlined" style={{color:'white',marginLeft:'6pt'}}>Done</Button>
                                    </div>
                                    :
                                    <div className='horizontalFlex'>
                                        <div style={{fontSize:'15pt'}}>{currentName}</div>
                                        <ModeEditIcon onClick={()=>setEditName(true)} style={{fontSize:'18pt', marginLeft:'6pt'}}></ModeEditIcon>
                                    </div>
                                }
                            </div>
                        </div>
    const totalDisplay = <div className='horizontalFlex' style={{width:'20%'}}>
                            <div className='horizontalFlex' style={{width:'100%',justifyContent:'space-between'}}>
                                <h2 >Total:</h2>
                                {
                                    editTotal && !editName && !editCategories ?
                                    <div className='horizontalFlex'>
                                        <Input id="totalInput" defaultValue={currentTotal} name="budgetName" sx={{width: 100}} placeholder="Budget Total" required></Input>
                                        <Button onClick={totalDone} variant="outlined" style={{color:'white',marginLeft:'6pt'}}>Done</Button>
                                    </div>
                                    :
                                    <div className='horizontalFlex'>
                                        <div style={{fontSize:'15pt'}}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentTotal)}</div>
                                        <ModeEditIcon onClick={()=>setEditTotal(true)} style={{display:'inline',fontSize:'18pt', marginLeft:'6pt',marginTop:'3pt'}}></ModeEditIcon>
                                    </div>
                                }
                            </div>
                        </div>
    const categoriesField =
    <div>
        {Object.keys(currentCategories).map(
            (name)=>(
            <div key={name} className='horizontalFlex'>
                <Input defaultValue={name} type="text" name="catAmount" sx={{width:200, height: 20}} required></Input>
                <Input defaultValue={currentCategories[name]} type="text" name="catAmount" sx={{marginLeft: '6pt',width:100, height: 20}} required></Input>
                <DeleteIcon style={{marginLeft:'6pt'}}></DeleteIcon>
                <Button onClick={categoriesDone} variant="outlined" style={{color:'white',marginLeft:'6pt'}}>Done</Button>
            </div>
        ))}
        <form style={{width:'100%', display:'flex', columnGap:'5%', justifyContent:'center',alignItems:'center'}}>
                <Button variant = "outlined" style={{color:'white', marginTop:'2%'}}type="submit">New Category</Button>
        </form>
    </div>
    const categoriesDisplay = 
                        <div className='horizontalFlex' style={{width:'20%'}}>
                            {
                                editCategories ?
                                <div>{categoriesField}</div>
                                :
                                <div className='verticalFlex' style={{width:'100%', justifyContent:'center'}}>
                                    <h2 style={{display:'inline'}}>Categories:</h2>
                                    {Object.keys(currentCategories).map((name) => 
                                        <div className="horizontalFlex" key={name}>{name + ": $" + currentCategories[name]}
                                            <ModeEditIcon onClick={()=>{setEditCategories(true)}} style={{marginLeft:'6pt',display:'inline',fontSize:'15pt'}}></ModeEditIcon>
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
    
                            

    
    return(
        <form onSubmit={saveBudget} className='verticalFlex' style={{width: '100%'}}>
            {nameDisplay}
            {totalDisplay}
            {categoriesDisplay}
            <Button type="submit" variant = "outlined" style={{color:'white', marginTop:"6%"}}>Save Budget</Button>
            <h3 style={{visibility: serverError ? "visible" : "hidden", color:"#f55656", fontWeight:'bolder', fontSize:'xxl', marginTop:'4%'}}>Server error - budget not saved</h3>
        </form>
    );
}