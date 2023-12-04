import '../styles/Sidebar.css'
import PropTypes from 'prop-types';
import 
{
    BsAlexa,
    BsFilter,
    BsFilterCircle,
    BsGrid1X2Fill, 
    BsPerson, 
}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <h2><span className='icon'><BsAlexa/></span> <span>Admin</span></h2>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <div className="container">
                <form>
                    <li className='sidebar-list-item'>
                        <a href='/'><span className='icon'><BsGrid1X2Fill/></span> <span>Dashboard</span></a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href='/domainFilter'><span className='icon'><BsFilter/></span> <span>Filter (by domain)</span></a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href='/availabilityFilter'><span className='icon'><BsFilterCircle/></span> <span>Filter (by availability)</span></a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href='/createUser'><span className='icon'><BsPerson/></span> <span>Create User</span></a>
                    </li>
                </form>
            </div>
        </ul>
    </aside>
  )
}

Sidebar.propTypes = {
    openSidebarToggle: PropTypes.bool.isRequired,
    OpenSidebar: PropTypes.func.isRequired,
};

export default Sidebar