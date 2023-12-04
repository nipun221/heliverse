import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import NewHero from '../components/NewHero';

const AvailabilityFilter = () => {
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
      <NewHero OpenSidebar={OpenSidebar}/>
    </div>
  )
}

export default AvailabilityFilter