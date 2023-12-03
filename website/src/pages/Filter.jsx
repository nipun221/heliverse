import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'

const Filter = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar 
        openSidebarToggle={openSidebarToggle} 
        OpenSidebar={OpenSidebar} 
      />
      <Home />
    </div>
  )
}

export default Filter