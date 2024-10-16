import PropTypes from 'prop-types'
import { memo } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

// assets
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" sx={{ color: 'primary.800' }}>
              Recogx Init
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6" sx={{ color: 'grey' }}>
          Phone Number - +91 63724322280
        </Typography>
        <Typography variant="h6" sx={{ color: 'grey' }}>
          Email - recogx.official@gmail.com
        </Typography>
      </Grid>
    </Grid>
  )
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number,
}

// ==============================|| SIDEBAR - MENU CARD ||============================== //

const MenuCard = () => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        bgcolor: 'primary.light',
        mb: 2.75,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 157,
          height: 157,
          bgcolor: 'primary.200',
          borderRadius: '50%',
          top: -105,
          right: -96,
        },
      }}>
      <Box sx={{ p: 2 }}>
        <List disablePadding sx={{ m: 0 }}>
          <ListItem alignItems="flex-start" disableGutters disablePadding>
            <ListItemAvatar sx={{ mt: 0 }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  color: 'primary.main',
                  border: 'none',
                  borderColor: 'primary.main',
                  bgcolor: 'background.paper',
                }}>
                <DirectionsCarIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ mt: 0 }}
              primary={
                <Typography variant="subtitle1" sx={{ color: 'primary.800' }}>
                  Dhanvantari: Emergency Ambulance Service
                </Typography>
              }
              secondary={
                <Typography variant="caption" sx={{ fontSize: 8 }}>
                  {' '}
                  Rapid Response, Lifesaving Care
                </Typography>
              }
            />
          </ListItem>
        </List>
        <LinearProgressWithLabel value={80} />
      </Box>
    </Card>
  )
}

export default memo(MenuCard)
