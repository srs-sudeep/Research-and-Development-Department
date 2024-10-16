// assets
import { IconUserPlus, IconUser } from '@tabler/icons-react'

// constant
const icons = { IconUserPlus, IconUser }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const driverSuperAdmin = {
  id: 'driver',
  title: 'Driver',
  type: 'group',
  children: [
    {
      id: 'driverlist',
      title: 'Driver Lists',
      type: 'item',
      url: '/superadmin/driver/list',
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    {
      id: 'drivercreate',
      title: 'Create Driver',
      type: 'item',
      url: '/superadmin/driver/create',
      icon: icons.IconUserPlus,
      breadcrumbs: false,
    },
  ],
}

export default driverSuperAdmin
