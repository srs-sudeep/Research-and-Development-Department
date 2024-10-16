import { Navigate } from 'react-router-dom'
import Page404 from 'views/pages/Page404'
import Login from 'views/pages/authentication/Login'

const commonRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '',
    element: <Navigate to="/login" repalce />,
  },
  {
    path: '404',
    element: <Page404 />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]

export default commonRoutes
