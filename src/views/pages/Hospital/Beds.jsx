import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import { getIndiHospital, updateIndiHospital } from 'api'
import MainCard from 'ui-component/cards/MainCard'

const Beds = () => {
  const [beds, setBeds] = useState([])
  const [editing, setEditing] = useState(null)
  const [editingIndex, setEditingIndex] = useState(null)
  const [newBedType, setNewBedType] = useState('')
  const [newBedNumber, setNewBedNumber] = useState('')
  const [open, setOpen] = useState(false) // State to manage modal open/close

  useEffect(() => {
    fetchBedDetails()
  }, [])

  const fetchBedDetails = async () => {
    try {
      const response = await getIndiHospital()
      setBeds(response._doc.beds)
      console.log('response', response._doc)
    } catch (error) {
      console.error('Error fetching bed details:', error.message)
    }
  }

  const handleEditClick = (bed) => {
    setEditing(bed)
  }

  const handleSave = async () => {
    try {
      // Update the bed at the editing index with the new values
      const updatedBeds = beds.map((bed) =>
        bed._id === editing._id
          ? {
              ...bed,
              bedType: editing.bedType,
              number: parseInt(editing.number, 10),
            }
          : bed,
      )
      console.log('updatedBeds', updatedBeds)
      const sanitizedExistingBeds = updatedBeds.map(({ _id, ...rest }) => rest)
      const updateBeds = [...sanitizedExistingBeds]
      await updateIndiHospital(updateBeds)
      setEditingIndex(null) // Clear editing state
      fetchBedDetails() // Fetch updated bed details
    } catch (error) {
      console.error('Error updating bed details:', error.message)
    }
  }

  const handleAddBed = async () => {
    try {
      const sanitizedExistingBeds = beds.map(({ _id, ...rest }) => rest)
      const newBed = { bedType: newBedType, number: parseInt(newBedNumber, 10) }
      const updatedBeds = [...sanitizedExistingBeds, newBed]

      await updateIndiHospital(updatedBeds) // Pass the array directly

      setNewBedType('')
      setNewBedNumber('')

      fetchBedDetails()
    } catch (error) {
      console.error('Error adding new bed:', error.message)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <MainCard title="Hospital Beds Availability">
      <Paper>
        <Box p={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            startIcon={<AddIcon />}>
            Add Bed
          </Button>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bed Type</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beds.map((bed) => (
                  <TableRow key={bed._id || `${bed.bedType}-${bed.number}`}>
                    <TableCell>
                      {editing && editing._id === bed._id ? (
                        <TextField
                          value={editing.bedType}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              bedType: e.target.value,
                            })
                          }
                        />
                      ) : (
                        bed.bedType
                      )}
                    </TableCell>
                    <TableCell>
                      {editing && editing._id === bed._id ? (
                        <TextField
                          type="number"
                          value={editing.number}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              number: e.target.value,
                            })
                          }
                        />
                      ) : (
                        bed.number
                      )}
                    </TableCell>
                    <TableCell>
                      {editing && editing._id === bed._id ? (
                        <IconButton onClick={handleSave}>
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleEditClick(bed)}>
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Modal for adding beds */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Bed</DialogTitle>
            <DialogContent>
              <TextField
                label="Bed Type"
                value={newBedType}
                onChange={(e) => setNewBedType(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Number of Beds"
                type="number"
                value={newBedNumber}
                onChange={(e) => setNewBedNumber(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleAddBed}
                color="primary"
                variant="contained"
                disabled={!newBedType || !newBedNumber}>
                Add Bed
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </MainCard>
  )
}

export default Beds
