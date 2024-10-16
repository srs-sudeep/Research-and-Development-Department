import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  useTheme,
} from '@mui/material'
import { getIndiHospital } from 'api'
import MainCard from 'ui-component/cards/MainCard'

const Profile = () => {
  const [hospitalDetails, setHospitalDetails] = useState({})
  const theme = useTheme()

  useEffect(() => {
    fetchHospitalDetails()
  }, [])

  const fetchHospitalDetails = async () => {
    try {
      const response = await getIndiHospital()
      setHospitalDetails(response)
    } catch (error) {
      console.error('Error fetching hospital details:', error.message)
    }
  }

  return (
    <MainCard title="Hospital Profile">
      <Card sx={{ maxWidth: 800, margin: 'auto', padding: 3, mt: 5 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              padding: 2,
              [theme.breakpoints.up('md')]: {
                flexDirection: 'row',
              },
            }}>
            {/* Left Column */}
            <Box
              sx={{
                flex: 1,
                paddingRight: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Hospital Name:</strong> {hospitalDetails.userName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Phone Number:</strong> {hospitalDetails.userPhoneNumber}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Email Verified:</strong>{' '}
                {hospitalDetails.userIsEmailVerified ? 'Yes' : 'No'}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Hospital ID:</strong> {hospitalDetails.userUsername}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Right Column */}
            <Box
              sx={{
                flex: 1,
                paddingLeft: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>POS Email:</strong> {hospitalDetails.posEmail}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>POS Contact:</strong> {hospitalDetails.posContact}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </MainCard>
  )
}

export default Profile
