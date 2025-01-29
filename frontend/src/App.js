import logo from './logo.svg';
import './style/App.css';
import NavBar from './Components/Global/NavBar.js';
import CalendarView from './Components/Calendar/CalendarView.js';
import CreateAccount from './Components/User/CreateAccount.js';
import Transactions from './Components/Transactions/ViewTransactions.js';
import AddTransactions from './Components/Transactions/AddTransaction.js';
import HomeScreen from './Components/HomeScreen.js';
import CreateBudget from './Components/Budget/CreateBudget.js';
import ViewBudgets from './Components/Budget/ViewBudgets.js';
import EditBudget from './Components/Budget/EditBudget.js';
import BudgetDetails from './Components/Budget/BudgetDetails.js';
import {Routes, Route} from 'react-router-dom';
import { createContext, useState } from 'react';

export const BudgetContext = createContext();      

function App() {

  const [ budgets, setBudgets ] = useState([]);
  const [ userId, setUserId ] = useState(null);

  return (
        <BudgetContext.Provider value={{budgets, setBudgets, userId, setUserId}}>
          <div className="App">
            <NavBar></NavBar>
            <Routes>
              <Route path = "/" element = {<HomeScreen/>}></Route>
              <Route path="/calendar-view" element={<CalendarView/>}></Route>
              <Route path="/createBudget" element={<CreateBudget/>}></Route>
              <Route path="/editBudget" element={<EditBudget/>}></Route>
              <Route path="/viewBudgets" element={<ViewBudgets/>}></Route>
              <Route path="/createAccount" element={<CreateAccount/>}></Route>
              <Route path="/budgetDetails" element={<BudgetDetails/>}></Route>
              <Route path="/transactions" element={<Transactions/>}></Route>
              <Route path="/addTransaction" element={<AddTransactions/>}></Route>
            </Routes>
          </div>
        </BudgetContext.Provider>
  );
}

export default App;
