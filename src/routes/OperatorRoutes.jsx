import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'

// dashboard routing
const DashboardDefault = lazyLoad(() => import('views/dashboard'))
const Profile = lazyLoad(() => import('views/pages/Operator/Profile'))
const Session = lazyLoad(() => import('views/pages/Operator/Session'))
const SessionIndi = lazyLoad(() => import('views/pages/Operator/SessionIndi'))

import { Navigate } from 'react-router-dom'

// ==============================|| MAIN ROUTING ||============================== //

const OperatorRoutes = [
  {
    path: '/operator',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/operator/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <DashboardDefault />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'session',
        element: <Session />,
      },
      {
        path: 'session/:sessionId',
        element: <SessionIndi />,
      },
    ],
  },
]

export default OperatorRoutes
