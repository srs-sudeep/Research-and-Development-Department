import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from '@mui/material'
import { getSessions } from 'api'

const Session = () => {
  const [sessions, setSessions] = useState(null)
  const operatorId = localStorage.getItem('userId')
  const navigate = useNavigate() // Initialize the navigate function

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getSessions(operatorId)
        setSessions(data)
      } catch (error) {
        console.log('Failed to fetch sessions. Please try again later.')
      }
    }
    fetchSessions()
  }, [operatorId])

  const handleRowClick = (sessionId) => {
    navigate(`/operator/session/${sessionId}`) // Redirect to the session details page
  }

  if (!sessions || sessions.length === 0) {
    return (
      <Typography variant="h6">
        No sessions available for this operator.
      </Typography>
    )
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Sessions for Operator
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <caption>Sessions assigned to the operator</caption>
          <TableHead>
            <TableRow>
              <TableCell>Session ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned Driver</TableCell>
              <TableCell>Assigned Hospital</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow
                key={session._id}
                onClick={() => handleRowClick(session._id)}
                style={{ cursor: 'pointer' }}>
                <TableCell>{session._id}</TableCell>
                <TableCell>{session.patientUser?.name || 'N/A'}</TableCell>
                <TableCell>{session.status}</TableCell>
                <TableCell>
                  {session.driverUser?.name || 'Unassigned'}
                </TableCell>
                <TableCell>
                  {session.assignedHospital?.name || 'Not Assigned'}
                </TableCell>
                <TableCell>{new Date(session.time).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Session
