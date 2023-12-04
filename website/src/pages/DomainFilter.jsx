import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Hero from '../components/Hero'

const DomainFilter = () => {
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
      <Hero OpenSidebar={OpenSidebar}/>
    </div>
  )
}

export default DomainFilter