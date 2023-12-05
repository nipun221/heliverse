import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import DomainFilter from './pages/DomainFilter';
import AvailabilityFilter from './pages/AvailabilityFilter';
import UserDetails from './pages/UserDetails';
import Form from './pages/Form';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/domainFilter" element={<DomainFilter/>}/>
        <Route exact path="/availabilityFilter" element={<AvailabilityFilter/>}/>
        <Route exact path="/createuser" element={<Form/>}/>
        <Route exact path="/userDetails/:id" element={<UserDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App