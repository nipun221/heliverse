import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import HeroPage from '../components/HeroPage';

const GenderFilter = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <Sidebar 
        openSidebarToggle={openSidebarToggle} 
        OpenSidebar={OpenSidebar} 
      />
      <HeroPage/>
    </div>
  )
}

export default GenderFilter