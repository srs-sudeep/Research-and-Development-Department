import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'

// dashboard routing
const DashboardDefault = lazyLoad(() => import('views/dashboard'))

//Hospital routing
const Beds = lazyLoad(() => import('views/pages/Hospital/Beds'))
const Profile = lazyLoad(() => import('views/pages/Hospital/Profile'))

import { Navigate } from 'react-router-dom'

// ==============================|| MAIN ROUTING ||============================== //

const HospitalRoutes = [
  {
    path: '/hospital',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/hospital/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <DashboardDefault />,
      },
      {
        path: 'beds',
        element: <Beds />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]

export default HospitalRoutes
