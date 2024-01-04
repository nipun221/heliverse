import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import Mockdata from '../apis/Mockdata';

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [userDetails, setUserDetails] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Mockdata.get(`/${id}`, {
          headers: {
            'Authorization': `${token}`,
          }
        });
        console.log(response.data);
        setUserDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/updateUser/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await Mockdata.delete(`/${id}`, {
          headers: {
            'Authorization': `${token}`,
          }
        });
        console.log(response.data.users);
      } catch (err) {
        console.log(err);
      }
      navigate('/dashboard');
    } else {
      navigate(`/userDetails/${id}`);
    }
  };

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
          <div className='button-container'>
            <button className="cssbuttons-io" onClick={handleUpdate}>
              <span> Update</span>
            </button>
            <button className="cssbuttons-io-delete" onClick={handleDelete}>
              <span> Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
