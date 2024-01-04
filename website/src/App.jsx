import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import DomainFilter from './pages/DomainFilter';
import AvailabilityFilter from './pages/AvailabilityFilter';
import UserDetails from './pages/UserDetails';
import Form from './pages/Form';
import UpdateForm from './pages/UpdateForm';
import GenderFilter from './pages/GenderFilter';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register/>}/>
        <Route default exact path="/" element={<Login/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route exact path="/filter/domain" element={<DomainFilter/>}/>
        <Route exact path="/filter/availability" element={<AvailabilityFilter/>}/>
        <Route exact path="/filter/gender" element={<GenderFilter/>}/>
        <Route exact path="/createuser" element={<Form/>}/>
        <Route exact path="/userDetails/:id" element={<UserDetails/>}/>
        <Route exact path="/updateUser/:id" element={<UpdateForm/>}/>
      </Routes>
    </Router>
  )
}

export default App