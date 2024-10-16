import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  useTheme,
} from '@mui/material'
import { getIndiOperator } from 'api' // Changed to getIndiOperator
import MainCard from 'ui-component/cards/MainCard'

const Profile = () => {
  const [operatorDetails, setOperatorDetails] = useState({})
  const theme = useTheme()

  useEffect(() => {
    fetchOperatorDetails()
  }, [])

  const fetchOperatorDetails = async () => {
    try {
      const response = await getIndiOperator()
      setOperatorDetails(response)
    } catch (error) {
      console.error('Error fetching operator details:', error.message)
    }
  }

  return (
    <MainCard title="Operator Profile">
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
                <strong>Operator Name:</strong> {operatorDetails.userName}{' '}
                {/* Changed to operator */}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Phone Number:</strong> {operatorDetails.userPhoneNumber}{' '}
                {/* Changed to operator */}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Email Verified:</strong>{' '}
                {operatorDetails.userIsEmailVerified ? 'Yes' : 'No'}{' '}
                {/* Changed to operator */}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Operator ID:</strong> {operatorDetails.userUsername}{' '}
                {/* Changed to operator */}
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
                <strong>POS Contact:</strong> {operatorDetails.alternateContact}{' '}
                {/* Changed to operator */}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </MainCard>
  )
}

export default Profile
