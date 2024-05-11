
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes,Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Dashboard from './Components/Dashboard';
import EmployeeList from './Components/EmployeeList';
import EditPage from './Components/EditPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/employeelist' element={<EmployeeList/>}/>
        <Route path='/edit/:id' element={<EditPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
