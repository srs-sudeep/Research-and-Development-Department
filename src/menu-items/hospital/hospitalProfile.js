// assets
import { IconUser } from '@tabler/icons-react'

// constant
const icons = { IconUser }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const hospitalProfile = {
  id: 'hospitalProfile',
  title: 'Profile',
  type: 'group',
  children: [
    {
      id: 'profileHospital',
      title: 'Profile',
      type: 'item',
      url: '/hospital/profile',
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
}

export default hospitalProfile
