import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import UpdateUser from '../components/UpdateUser';

const UpdateForm = () => {
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
        <UpdateUser />
      </div>
    </div>
  )
}

export default UpdateForm