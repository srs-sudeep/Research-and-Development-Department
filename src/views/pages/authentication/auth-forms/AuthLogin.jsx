import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Stack,
  FormHelperText,
} from '@mui/material'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { loginStart, loginSuccess, loginFailure } from 'store/auth'
import { loginApi } from 'api/auth'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { useNavigate } from 'react-router-dom'

const AuthLogin = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(true)
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (event) => event.preventDefault()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const userRole = localStorage.getItem('userRole')
    if (accessToken && userRole) {
      if (userRole === 'operator') {
        navigate('/operator')
      } else if (userRole === 'hospital') {
        navigate('/hospital')
      } else if (userRole === 'superadmin') {
        navigate('/superadmin')
      }
    }
  }, [navigate])

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    dispatch(loginStart())
    try {
      const data = await loginApi(values.phoneNumber, values.password)
      localStorage.setItem('userRole', data.user.role)
      dispatch(loginSuccess(data.user, data.refreshToken))

      if (data.user.role === 'operator') {
        navigate('/operator')
      } else if (data.user.role === 'hospital') {
        navigate('/hospital')
      } else if (data.user.role === 'superadmin') {
        navigate('/superadmin')
      }
    } catch (error) {
      dispatch(loginFailure(error.message))
      setErrors({ submit: error.message })
    }
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{
        phoneNumber: '',
        password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        phoneNumber: Yup.string()
          .required('Phone number is required')
          .matches(/^[0-9]+$/, 'Phone number must be only digits')
          .min(10, 'Phone number must be at least 10 digits')
          .max(15, 'Phone number can be up to 15 digits'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={handleSubmit}>
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <FormControl
            fullWidth
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-phone-login">
              Phone Number
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-phone-login"
              type="text"
              value={values.phoneNumber}
              name="phoneNumber"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Phone Number"
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <FormHelperText error>{errors.phoneNumber}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-login">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </Button>
                </InputAdornment>
              }
              label="Password"
            />
            {touched.password && errors.password && (
              <FormHelperText error>{errors.password}</FormHelperText>
            )}
          </FormControl>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Typography
              variant="subtitle1"
              color="secondary"
              sx={{ cursor: 'pointer' }}>
              Forgot Password?
            </Typography>
          </Stack>

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting || authState.loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary">
                Sign in
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default AuthLogin
