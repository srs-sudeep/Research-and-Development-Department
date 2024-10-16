import { useRoutes } from 'react-router-dom'
import useAuthValidation from 'core/Private/Private'
import SuperAdminRoutes from './SuperAdminRoutes'
import HospitalRoutes from './HospitalRoutes'
import commonRoutes from './commonRoutes'
import OperatorRoutes from './OperatorRoutes'

export default function Router() {
  useAuthValidation()
  const routes = useRoutes([
    ...SuperAdminRoutes,
    ...HospitalRoutes,
    ...OperatorRoutes,
    ...commonRoutes,
  ])

  return routes
}
