import logo from './logo.svg';
import './style/App.css';
import HomeScreen from './Components/HomeScreen.js';
import CalendarView from './Components/CalendarView.js';
import CreateNewBudget from './Components/CreateNewBudget.js';
import ViewBudgets from './Components/ViewBudgets.js';
import NavBar from './Components/NavBar.js';
import {Routes, Route} from 'react-router-dom';
import { GlobalStoreContextProvider } from './GlobalStore.js';

function App() {
  return (
        <div className="App">
          <NavBar></NavBar>
          <Routes>
            <Route path = "/" element = {<HomeScreen/>}></Route>
            <Route path = "/calendar-view" element = {<CalendarView/>}></Route>
            <Route path="/createBudget" element={<CreateNewBudget/>}></Route>
            <Route path="/viewBudgets" element={<ViewBudgets/>}></Route>
          </Routes>
        </div>
  );
}

export default App;
