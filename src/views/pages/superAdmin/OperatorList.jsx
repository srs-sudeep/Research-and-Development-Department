import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  TableSortLabel,
} from '@mui/material'
import MainCard from 'ui-component/cards/MainCard'

const OperatorList = () => {
  const [hospitals, setHospitals] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, searchTerm, order, orderBy])

  const fetchData = () => {
    // Dummy data
    const allHospitals = [
      {
        id: 1,
        name: 'General Hospital',
        email: 'general@hospital.com',
        phone: '123-456-7890',
      },
      {
        id: 2,
        name: 'City Hospital',
        email: 'city@hospital.com',
        phone: '987-654-3210',
      },
      {
        id: 3,
        name: 'Suburban Clinic',
        email: 'suburban@clinic.com',
        phone: '555-555-5555',
      },
      {
        id: 4,
        name: 'Downtown Medical',
        email: 'downtown@medical.com',
        phone: '444-444-4444',
      },
      {
        id: 5,
        name: 'Uptown Health',
        email: 'uptown@health.com',
        phone: '333-333-3333',
      },
      {
        id: 6,
        name: 'Westside Clinic',
        email: 'westside@clinic.com',
        phone: '222-222-2222',
      },
      {
        id: 7,
        name: 'Eastside Medical',
        email: 'eastside@medical.com',
        phone: '111-111-1111',
      },
    ]

    // Filter data based on search term
    const filteredHospitals = allHospitals.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.phone.includes(searchTerm),
    )

    // Sort data
    const sortedHospitals = filteredHospitals.sort((a, b) => {
      if (order === 'asc') {
        return a[orderBy].localeCompare(b[orderBy])
      } else {
        return b[orderBy].localeCompare(a[orderBy])
      }
    })

    // Paginate data
    const paginatedHospitals = sortedHospitals.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    )

    setHospitals(paginatedHospitals)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setPage(0) // Reset to first page when searching
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to first page when changing rows per page
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <MainCard title="Hospital List">
      <Paper>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}>
                    Name of the Hospital
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? order : 'asc'}
                    onClick={() => handleRequestSort('email')}>
                    Email ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'phone'}
                    direction={orderBy === 'phone' ? order : 'asc'}
                    onClick={() => handleRequestSort('phone')}>
                    Phone Number
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell>{hospital.name}</TableCell>
                  <TableCell>{hospital.email}</TableCell>
                  <TableCell>{hospital.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={7} // Total count of all dummy data entries
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </MainCard>
  )
}

export default OperatorList
