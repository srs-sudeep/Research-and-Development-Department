import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSessionById, updateSession } from 'api' // Ensure updateSession is imported
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Modal,
  Button,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
const base_url = import.meta.env.VITE_APP_WEBSOCKET_URL
const SessionIndi = () => {
  const { sessionId } = useParams()
  const [sessionData, setSessionData] = useState(null)
  const [patientLocation, setPatientLocation] = useState(null)
  const [driverLocation, setDriverLocation] = useState(null)
  const [error, setError] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [selectedAmbulance, setSelectedAmbulance] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [cardStyle, setCardStyle] = useState({})
  const [statusText, setStatusText] = useState('')
  const [textColor, setTextColor] = useState('black')

  const fetchSessionData = async () => {
    try {
      const data = await getSessionById(sessionId)
      setSessionData(data)
      const sessionStatus = data ? data.status : 'pending'
      const { cardStyle, statusText, textColor } = getStatusCard(sessionStatus)
      setCardStyle(cardStyle)
      setStatusText(statusText)
      setTextColor(textColor)
    } catch (err) {
      setError('Failed to fetch session details. Please try again later.')
    }
  }
  useEffect(() => {
    fetchSessionData()
  }, [sessionId])

  useEffect(() => {
    if (!sessionData) return
    const patientSocket = new WebSocket(`${base_url}/patient/location`)
    let driverSocket

    // Patient WebSocket connection
    patientSocket.onmessage = (event) => {
      const { lat, lng } = JSON.parse(event.data)
      setPatientLocation({ lat, lng })
    }

    // If you are tracking driver locations as well
    driverSocket = new WebSocket(
      `${base_url}driver/${sessionData.assignedDriver}`,
    )
    driverSocket.onopen = () => {
      console.log('Connected to WebSocket server')
    }
    driverSocket.onmessage = async (event) => {
      try {
        const message = event.data
        const data = JSON.parse(message)
        console.log('hel')
        const { lat, lng } = JSON.parse()
        setDriverLocation({ lat, lng })
      } catch {
        console.log('data unavaialble')
      }
    }

    // Clean up WebSocket connections
    return () => {
      patientSocket.close()
      driverSocket && driverSocket.close()
    }
  }, [])

  // Log location to verify data updates
  useEffect(() => {
    console.log('Updated Patient Location:', patientLocation)
    console.log('Updated Driver Location:', driverLocation)
  }, [patientLocation, driverLocation])

  const getStatusCard = (status) => {
    let cardStyle = {}
    let textColor = 'white'
    let statusText = 'Unknown Status'

    switch (status) {
      case 'pending':
        cardStyle = { backgroundColor: 'orange' }
        statusText = 'PENDING'
        break
      case 'in-progress':
        cardStyle = { backgroundColor: 'yellow', color: 'black' }
        statusText = 'IN PROGRESS'
        break
      case 'completed':
        cardStyle = { backgroundColor: 'green' }
        statusText = 'COMPLETED'
        break
      case 'cancelled':
        cardStyle = { backgroundColor: 'red' }
        statusText = 'CANCELLED'
        break
      default:
        break
    }

    return { cardStyle, statusText, textColor }
  }
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleAmbulanceClick = (ambulance) => {
    setSelectedAmbulance(ambulance)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedAmbulance(null)
  }

  const handleAssignAmbulance = async () => {
    if (selectedAmbulance) {
      const sessionId = sessionData._id
      try {
        const updateData = {
          assignedDriver: selectedAmbulance.ambulance,
          status: 'in-progress',
        }
        await updateSession(sessionId, updateData)
        handleCloseModal()
        fetchSessionData()
      } catch (err) {
        setError('Failed to assign the ambulance. Please try again.')
      }
    }
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    )
  }

  if (!sessionData) {
    return <Typography variant="h6">No session data found.</Typography>
  }

  const { patientUser, driverUser, questions, recommendedAmbulances } =
    sessionData

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Session Details
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
        className="flex flex-col md:flex-row">
        <Card style={{ flex: 1, margin: '16px' }}>
          <CardContent>
            <Typography variant="h6">Patient Details</Typography>
            <Typography>Name: {patientUser.name}</Typography>
            <Typography>Email: {patientUser.email}</Typography>
            <Typography>Phone: {patientUser.phoneNumber}</Typography>
          </CardContent>
        </Card>

        <Card
          style={{
            flex: 1,
            ...cardStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '16px',
          }}>
          <Typography variant="h1">{statusText}</Typography>
        </Card>

        <Card style={{ flex: 1, margin: '16px' }}>
          <CardContent>
            <Typography variant="h6">Driver Details</Typography>
            {driverUser ? (
              <>
                <Typography>Name: {driverUser.name}</Typography>
                <Typography>Email: {driverUser.email}</Typography>
                <Typography>Phone: {driverUser.phoneNumber}</Typography>
              </>
            ) : (
              <Typography>No Driver Assigned</Typography>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        style={{ marginTop: '16px' }}>
        <Tab label="Questions" />
        <Tab label="Recommended Ambulances" />
        <Tab label="Map" />
      </Tabs>

      {tabValue === 0 && (
        <Paper elevation={2} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h6">Questions and Answers</Typography>
          {questions.map((item) => (
            <Accordion key={item._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${item._id}-content`}
                id={`panel${item._id}-header`}>
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      )}

      {tabValue === 1 && (
        <Paper elevation={2} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h6">Recommended Ambulances</Typography>
          <List>
            {recommendedAmbulances.map((ambulance) => {
              const isAssigned =
                sessionData.assignedDriver === ambulance.ambulance
              return (
                <ListItem
                  button={!isAssigned}
                  key={ambulance._id}
                  onClick={() => !isAssigned && handleAmbulanceClick(ambulance)}
                  style={{
                    backgroundColor: isAssigned ? '#d1e7dd' : '#fff',
                    border: isAssigned ? '2px solid #0f5132' : '1px solid #ddd',
                    marginBottom: '8px',
                    pointerEvents: isAssigned ? 'none' : 'auto',
                  }}>
                  <ListItemText
                    primary={`Ambulance ID: ${ambulance.ambulance}`}
                    secondary={`Rank: ${ambulance.rank}`}
                    style={{
                      fontWeight: isAssigned ? 'bold' : 'normal',
                    }}
                  />
                </ListItem>
              )
            })}
          </List>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper elevation={2} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h6">Map</Typography>
          <MapContainer
            center={[
              patientLocation?.lat || 51.505,
              patientLocation?.lng || -0.09,
            ]}
            zoom={13}
            style={{ height: '400px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {patientLocation && (
              <Marker position={[patientLocation.lat, patientLocation.lon]}>
                <Popup>Patient's Location</Popup>
              </Marker>
            )}
            {driverLocation && (
              <Marker position={[driverLocation.lat, driverLocation.lon]}>
                <Popup>Driver's Location</Popup>
                {tabValue === 2 && (
                  <Paper
                    elevation={2}
                    style={{ padding: '16px', marginTop: '16px' }}>
                    <Typography variant="h6">Map</Typography>
                    <MapContainer
                      center={[
                        patientLocation?.lat || 51.505,
                        patientLocation?.lng || -0.09,
                      ]}
                      zoom={13}
                      style={{ height: '400px' }}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                      />
                      {patientLocation && (
                        <Marker
                          position={[patientLocation.lat, patientLocation.lon]}>
                          <Popup>Patient's Location</Popup>
                        </Marker>
                      )}
                      {driverLocation && (
                        <Marker
                          position={[driverLocation.lat, driverLocation.lon]}>
                          <Popup>Driver's Location</Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  </Paper>
                )}
              </Marker>
            )}
          </MapContainer>
        </Paper>
      )}

      {/* Modal for assigning ambulance */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Paper
          elevation={3}
          style={{
            padding: '16px',
            margin: 'auto',
            width: '400px',
            marginTop: '100px',
          }}>
          <Typography variant="h6">Assign Ambulance</Typography>
          {selectedAmbulance && (
            <>
              <Typography>
                Ambulance ID: {selectedAmbulance.ambulance}
              </Typography>
              <Typography>Rank: {selectedAmbulance.rank}</Typography>
              <Typography>
                Do you want to assign this ambulance to the session?
              </Typography>
              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAssignAmbulance}>
                  Assign
                </Button>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </Paper>
      </Modal>
    </div>
  )
}

export default SessionIndi
