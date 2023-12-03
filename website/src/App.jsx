import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Filter from './pages/Filter';
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/filter" element={<Filter/>}/>
        <Route exact path="/createuser" element={<CreateUser/>}/>
      </Routes>
    </Router>
  )
}

export default App