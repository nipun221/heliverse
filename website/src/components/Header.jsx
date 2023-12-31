import { Link } from '@mui/material';
import '../styles/Header.css'
import PropTypes from 'prop-types';
import 
 { BsJustify, BsGithub, BsSaveFill }
 from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

function Header({OpenSidebar, searchValue, setSearchValue, onSearchValueChange}) {

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        onSearchValueChange(value);
    };

    const handleSearch = () => {
        console.log('Search value:', searchValue);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
    };

    const onLogout = () => {
        localStorage.removeItem("token");
        navigate(`/`);
    }

    return (
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar}/>
            </div>
            <div className='header-left'>
                <div className="inputBox_container">
                    <svg className="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" alt="search icon">
                        <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z">
                        </path>
                    </svg>
                    <input className="inputBox" id="inputBox" type="text" placeholder="Search For Users" value={searchValue} onChange={handleInputChange} onKeyDown={handleKeyPress}></input>
                </div>
            </div>
            <div className='header-right'>
            <Link href="https://github.com/nipun221/heliverse" target="_blank" rel="noopener noreferrer">
                <BsGithub className='icon' />
            </Link>
            <Link href='/'><BsSaveFill className='icon' onClick={onLogout} /></Link>
            </div>
        </header>
    )
}

Header.propTypes = {
    OpenSidebar: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    onSearchValueChange: PropTypes.func.isRequired,
};

export default Header