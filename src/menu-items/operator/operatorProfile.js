// assets
import { IconUser } from '@tabler/icons-react'

// constant
const icons = { IconUser }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const operatorProfile = {
  id: 'operatorProfile',
  title: 'Profile',
  type: 'group',
  children: [
    {
      id: 'operatorProfile',
      title: 'Profile',
      type: 'item',
      url: '/operator/profile',
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
}

export default operatorProfile
