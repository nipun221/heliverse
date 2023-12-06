import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import Mockdata from '../apis/Mockdata';

const UserDetails = () => {
  const { id } = useParams();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Mockdata.get(`/${id}`);
        console.log(response.data);
        setUserDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='grid-container'>
      <Sidebar 
        openSidebarToggle={openSidebarToggle} 
        OpenSidebar={OpenSidebar} 
      />
      <div className="new_card">
        <div className="card-container">
          <header className='user_header'>
            <img className='user_img' src='https://robohash.org/sintessequaerat.png?size=50x50&set=set1' alt='name' />
          </header>
          <h1 className="bold-text">
            {userDetails?.first_name || ''} {userDetails?.last_name || ''}
          </h1>
          <h2 className="normal-text">{userDetails?.email || ''}</h2>
          <div className="social-container">
            <div className="followers">
              <h1 className="bold-text">{userDetails?.gender || ''}</h1>
              <h2 className="smaller-text">Gender</h2>
            </div>
            <div className="likes">
              <h1 className="bold-text">{userDetails?.domain || ''}</h1>
              <h2 className="smaller-text">Domain</h2>
            </div>
            <div className="photos">
              <h1 className="bold-text">{userDetails?.available ? 'Yes' : 'No'}</h1>
              <h2 className="smaller-text">Available</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
