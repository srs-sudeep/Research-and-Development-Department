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
  Modal,
  Box,
  Fade,
  Typography,
  Backdrop,
} from '@mui/material'
import MainCard from 'ui-component/cards/MainCard'
import { getAllHospital } from 'api'

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [totalHospitals, setTotalHospitals] = useState(0) // For pagination
  const [selectedHospital, setSelectedHospital] = useState(null) // For modal
  const [open, setOpen] = useState(false) // Modal open state

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, searchTerm, order, orderBy])

  const fetchData = async () => {
    try {
      const params = {
        page: page + 1, // API expects a 1-based page index
        limit: rowsPerPage,
        sortBy: `${orderBy}:${order}`,
      }

      const data = await getAllHospital(params)
      const { results, totalResults } = data
      setHospitals(results)
      setTotalHospitals(totalResults)
    } catch (error) {
      console.error('Error fetching hospitals:', error.message)
    }
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

  const handleRowClick = (hospital) => {
    setSelectedHospital(hospital)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedHospital(null)
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
                    active={orderBy === 'username'}
                    direction={orderBy === 'username' ? order : 'asc'}
                    onClick={() => handleRequestSort('username')}>
                    Username
                  </TableSortLabel>
                </TableCell>
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
                <TableRow
                  key={hospital._id}
                  hover
                  onClick={() => handleRowClick(hospital)}>
                  <TableCell>{hospital.userDetails.username}</TableCell>
                  <TableCell>{hospital.userDetails.name}</TableCell>
                  <TableCell>{hospital.userDetails.email}</TableCell>
                  <TableCell>{hospital.userDetails.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalHospitals} // Total count of all hospital entries
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for displaying hospital details */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #white',
              boxShadow: 24,
              p: 4,
            }}>
            {selectedHospital && (
              <>
                <Typography variant="h1" gutterBottom>
                  Hospital Details
                </Typography>
                <Typography variant="body1">
                  <strong>Hospital Name:</strong> {selectedHospital.name}
                </Typography>
                <Typography variant="body1">
                  <strong>POS Email:</strong> {selectedHospital.posEmail}
                </Typography>
                <Typography variant="body1">
                  <strong>POS Contact:</strong> {selectedHospital.posContact}
                </Typography>
                <Typography variant="body1">
                  <strong>Hospital Beds:</strong>{' '}
                  {JSON.stringify(selectedHospital.beds)}
                </Typography>
                <Typography variant="body1">
                  <strong>Created At:</strong>{' '}
                  {new Date(selectedHospital.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Updated At:</strong>{' '}
                  {new Date(selectedHospital.updatedAt).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Username:</strong>{' '}
                  {selectedHospital.userDetails.username}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedHospital.userDetails.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedHospital.userDetails.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong>{' '}
                  {selectedHospital.userDetails.phoneNumber}
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </MainCard>
  )
}

export default HospitalList
