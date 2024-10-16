// material-ui
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://berrydashboard.io"
      target="_blank"
      underline="hover">
      Dhanvantari
    </Typography>
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://recogxinit.vercel.app"
      target="_blank"
      underline="hover">
      &copy; recogxinit
    </Typography>
  </Stack>
)

export default AuthFooter
