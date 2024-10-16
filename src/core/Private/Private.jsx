import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import validator from 'api/validator'

const useAuthValidation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const validation = async () => {
      try {
        const response = await validator()
        const person = response.user.role
        console.log(person, response.user.role)
        if (
          person === 'operator' &&
          (location.pathname.startsWith('/superadmin') ||
            location.pathname.startsWith('/hospital'))
        ) {
          window.location.pathname = '/operator'
        }
        if (
          person === 'hospital' &&
          (location.pathname.startsWith('/operator') ||
            location.pathname.startsWith('/superadmin'))
        ) {
          window.location.pathname = '/hospital'
        }
        if (
          person === 'superadmin' &&
          (location.pathname.startsWith('/hospital') ||
            location.pathname.startsWith('/operator'))
        ) {
          window.location.pathname = '/superadmin'
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.clear()
          navigate('/login', { replace: true })
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.msg
        ) {
          const errorMessage = error.response.data.msg
          alert(errorMessage)
        } else {
          console.error(error)
        }
        navigate('/login', { replace: true })
      }
    }
    if (location.pathname !== '/login') validation()
  }, [navigate, location.pathname])
}

export default useAuthValidation
