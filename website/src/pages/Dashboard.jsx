import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'

const Dashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (value) => {
    setSearchValue(value);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} searchValue={searchValue} setSearchValue={setSearchValue} onSearchValueChange={handleSearchValueChange}/>
      <Sidebar 
        openSidebarToggle={openSidebarToggle} 
        OpenSidebar={OpenSidebar} 
      />
      <Home searchValue={searchValue}/>
    </div>
  )
}

export default Dashboard