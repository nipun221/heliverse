import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import DomainFilter from './pages/DomainFilter';
import AvailabilityFilter from './pages/AvailabilityFilter';
import UserDetails from './pages/UserDetails';
import Form from './pages/Form';
import UpdateForm from './pages/UpdateForm';
import GenderFilter from './pages/GenderFilter';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/domainFilter" element={<DomainFilter/>}/>
        <Route exact path="/availabilityFilter" element={<AvailabilityFilter/>}/>
        <Route exact path="/filter/gender" element={<GenderFilter/>}/>
        <Route exact path="/createuser" element={<Form/>}/>
        <Route exact path="/userDetails/:id" element={<UserDetails/>}/>
        <Route exact path="/updateUser/:id" element={<UpdateForm/>}/>
      </Routes>
    </Router>
  )
}

export default App