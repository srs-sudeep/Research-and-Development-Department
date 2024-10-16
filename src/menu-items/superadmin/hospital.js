// assets
import {
  IconDashboard,
  IconHospital,
  IconEmergencyBed,
} from '@tabler/icons-react'

// constant
const icons = { IconDashboard, IconHospital, IconEmergencyBed }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const hospitalSuperadmin = {
  id: 'hospital',
  title: 'Hospital',
  type: 'group',
  children: [
    {
      id: 'hospitallist',
      title: 'Hospital Lists',
      type: 'item',
      url: '/superadmin/hospital/list',
      icon: icons.IconHospital,
      breadcrumbs: false,
    },
    {
      id: 'hospitalcreate',
      title: 'Create Hospital',
      type: 'item',
      url: '/superadmin/hospital/create',
      icon: icons.IconEmergencyBed,
      breadcrumbs: false,
    },
  ],
}

export default hospitalSuperadmin
