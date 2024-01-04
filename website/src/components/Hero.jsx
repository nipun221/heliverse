import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { useEffect, useState } from 'react'
import Mockdata from '../apis/Mockdata'
import { Pagination } from '@mui/material'
import { BsGithub, BsJustify } from 'react-icons/bs'
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom'
  
const statusObj = {
false: { color: 'error' },
true: { color: 'success' }
}
  

function Hero({OpenSidebar}) {
  const [domain, setDomain] = useState('Sales');
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem('token');

  const handleFetchData = async () => {
    try {
      const response = await Mockdata.get(`/domain/${domain}?page=${currentPage}`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      setRows(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDomainChange = (selectedDomain) => {
    setDomain(selectedDomain);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    handleFetchData();
  }, [currentPage, domain]);

  useEffect(() => {
    handleFetchData(); // Fetch data whenever domain changes
  }, [domain]);

  return (
    <main className='main-container-hero'>
        <header className='header'>
          <div className='menu-icon'>
              <BsJustify className='icon' onClick={OpenSidebar}/>
          </div>
          <div className='header-left'>
            <div className="wrapper">
              <div className="option">
                <input
                  className="input"
                  type="radio"
                  name="btn"
                  value="Sales"
                  defaultChecked
                  onClick={() => {
                    handleDomainChange('Sales');
                  }}
                />
                <div className="btn">
                  <span className="span">Sales</span>
                </div>
              </div>
              <div className="option">
                <input
                  className="input"
                  type="radio"
                  name="btn"
                  value="Finance"
                  onClick={() => {
                    handleDomainChange('Finance');
                  }}
                />
                <div className="btn">
                  <span className="span">Finance</span>
                </div>
              </div>
              <div className="option">
                <input
                  className="input"
                  type="radio"
                  name="btn"
                  value="Marketing"
                  onClick={() => {
                    handleDomainChange('Marketing');
                  }}
                />
                <div className="btn">
                  <span className="span">Marketing</span>
                </div>
              </div>
              <div className="option">
                <input
                  className="input"
                  type="radio"
                  name="btn"
                  value="IT"
                  onClick={() => {
                    handleDomainChange('IT');
                  }}
                />
                <div className="btn">
                  <span className="span">IT</span>
                </div>
              </div>
              <div className="option">
                <input
                  className="input"
                  type="radio"
                  name="btn"
                  value="Management"
                  onClick={() => {
                    handleDomainChange('Management');
                  }}
                />
                <div className="btn">
                  <span className="span">Management</span>
                </div>
              </div>
              <div className="option">
                <input
                  className="input"
                  type="radio"
                  name="btn"
                  value="UI Designing"
                  onClick={() => {
                    handleDomainChange('UI Designing');
                  }}
                />
                <div className="btn">
                  <span className="span">UI Designing</span>
                </div>
              </div>
              <div className="option">
                <input
                  className="input"
                  type="radio"
                  name="btn"
                  value="Business Development"
                  onClick={() => {
                    handleDomainChange('Business Development');
                  }}
                />
                <div className="btn">
                  <span className="span">BD</span>
                </div>
              </div>
            </div>
          </div>
          <div className='header-right'>
          <Link href="https://github.com/nipun221/heliverse" target="_blank" rel="noopener noreferrer">
              <BsGithub className='icon' />
          </Link>
          </div>
        </header>
        <Card style={{ backgroundColor: '#e7e3fc', opacity: 0.8 }}>
        <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
                <TableRow>
                    <TableCell style={{ fontSize: '1rem', fontWeight: 'bold' }}>Id</TableCell>
                    <TableCell style={{ fontSize: '1rem', fontWeight: 'bold' }}>Avatar</TableCell>
                    <TableCell style={{ fontSize: '1rem', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell style={{ fontSize: '1rem', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell style={{ fontSize: '1rem', fontWeight: 'bold' }}>Gender</TableCell>
                    <TableCell style={{ fontSize: '1rem', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell style={{ fontSize: '1rem', fontWeight: 'bold' }}>Details</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => (
                <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                            component='img'
                            src={row.avatar}
                            sx={{ width: 50, height: 50, borderRadius: '50%' }}
                            />
                        </Box>
                    </TableCell>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.first_name} {row.last_name}</Typography>
                            <Typography variant='caption'>{row.domain}</Typography>
                        </Box>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>
                    <Chip
                        label={row.available ? 'Available' : 'Not Available'}
                        color={statusObj[row.available].color}
                        sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                        }}
                    />
                    </TableCell>
                    <TableCell sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                      <Link to={`/userDetails/${row.id}`}><InfoIcon style={{ color: '#1d2634' }}/></Link>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, newPage) => handlePageChange(newPage)}
            />
            </Box>
        </TableContainer>
        </Card>
    </main>
  )
}

Hero.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
};

export default Hero