import './App.css';
import Signup from './components/Signup';
import Login from "./components/Login"
import { BrowserRouter , Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CompanyList from "./components/CompanyList"
import AddCompany from './components/AddCompany';
import UpdateCompany from './components/UpdateCompany';
import PrivateComponent from './components/PrivateComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>

      <Routes>
        
      <Route element = {<PrivateComponent/>}>
     
     <Route path="/" element={<CompanyList/>} />
     <Route path="/add" element={<AddCompany/>} />
     <Route path="/update/:id" element={<UpdateCompany/>} />
     <Route path="/logout" element={<h1>Logout component</h1>} />
     
     
          
        </Route>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />


      </Routes>

      
      </BrowserRouter>
   
    </div>
  );
}

export default App;
