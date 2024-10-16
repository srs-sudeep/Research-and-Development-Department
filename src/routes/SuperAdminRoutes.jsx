import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'

// dashboard routing
const DashboardDefault = lazyLoad(() => import('views/dashboard'))

//Hospital routing
const HospitalCreate = lazyLoad(
  () => import('views/pages/superAdmin/HospitalCreate'),
)
const HospitalList = lazyLoad(
  () => import('views/pages/superAdmin/HospitalList'),
)

//Operator routing
const OperatorList = lazyLoad(
  () => import('views/pages/superAdmin/OperatorList'),
)
const OperatorCreate = lazyLoad(
  () => import('views/pages/superAdmin/OperatorCreate'),
)

//User Routing
const UserList = lazyLoad(() => import('views/pages/superAdmin/UserList'))

//Driver Routing
const DriverCreate = lazyLoad(
  () => import('views/pages/superAdmin/DriverCreate'),
)
const DriverList = lazyLoad(() => import('views/pages/superAdmin/DriverList'))
import { Navigate } from 'react-router-dom'

// ==============================|| MAIN ROUTING ||============================== //

const SuperAdminRoutes = [
  {
    path: '/superadmin',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/superadmin/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <DashboardDefault />,
      },
      {
        path: 'hospital',
        children: [
          {
            path: 'create',
            element: <HospitalCreate />,
          },
          {
            path: 'list',
            element: <HospitalList />,
          },
        ],
      },
      {
        path: 'operator',
        children: [
          {
            path: 'create',
            element: <OperatorCreate />,
          },
          {
            path: 'list',
            element: <OperatorList />,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'list',
            element: <UserList />,
          },
        ],
      },
      {
        path: 'driver',
        children: [
          {
            path: 'create',
            element: <DriverCreate />,
          },
          {
            path: 'list',
            element: <DriverList />,
          },
        ],
      },
    ],
  },
]

export default SuperAdminRoutes
