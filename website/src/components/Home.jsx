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
import { Link } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import PropTypes from 'prop-types';
  
const statusObj = {
false: { color: 'error' },
true: { color: 'success' }
}
  

function Home({ searchValue }) {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  console.log(searchValue);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = `?page=${currentPage}`;
      
        if (searchValue) {
          endpoint = `/search/${searchValue}${endpoint}`;
        }
        const response = await Mockdata.get(endpoint, {
          headers: {
            'Authorization': `${token}`,
          },
        });
        console.log(response.data.users);
        setRows(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [searchValue, currentPage, setRows, setTotalPages, token]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <main className='main-container'>
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

Home.propTypes = {
    searchValue: PropTypes.string.isRequired,
};

export default Home