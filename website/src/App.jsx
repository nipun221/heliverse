import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import CreateUser from './pages/CreateUser';
import DomainFilter from './pages/DomainFilter';
import AvailabilityFilter from './pages/AvailabilityFilter';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/domainFilter" element={<DomainFilter/>}/>
        <Route exact path="/availabilityFilter" element={<AvailabilityFilter/>}/>
        <Route exact path="/createuser" element={<CreateUser/>}/>
      </Routes>
    </Router>
  )
}

export default App