// assets
import { IconDashboard } from '@tabler/icons-react'

// constant
const icons = { IconDashboard }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'superadmindashboard',
  title: 'SuperAdminDashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/superadmin/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
  ],
}

export default dashboard
