import { useState, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import SplashScreen from 'ui-component/SplashScreen/SplashScreen'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
// import { LoadingProvider } from 'context/LoadingContext'
// routing
import { BrowserRouter } from 'react-router-dom'
import Router from 'routes'

// defaultTheme
import { useSelector } from 'react-redux'
import themes from 'themes'

// project imports
import NavigationScroll from 'layout/NavigationScroll'

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit')
    if (!firstVisit) {
      setLoading(true)
      localStorage.setItem('firstVisit', 'false')
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    } else {
      setLoading(false)
    }

    const handleBeforeUnload = () => {
      localStorage.setItem('firstVisit', 'true')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  if (loading) {
    return <SplashScreen />
  }
  return (
    <StyledEngineProvider injectFirst>
      <ReactNotifications />
      {/* <LoadingProvider> */}
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider theme={themes(customization)}>
            <CssBaseline />
            <NavigationScroll>
              <Router />
            </NavigationScroll>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
      {/* </LoadingProvider> */}
    </StyledEngineProvider>
  )
}

export default App
