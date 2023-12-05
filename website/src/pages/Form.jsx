import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import CreateUser from '../components/CreateUser';

const Form = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container-new'>
      <Sidebar 
        openSidebarToggle={openSidebarToggle} 
        OpenSidebar={OpenSidebar} 
      />
      <div className='main'>
        <CreateUser />
      </div>
    </div>
  )
}

export default Form