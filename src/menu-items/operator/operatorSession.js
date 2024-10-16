// assets
import { IconUser } from '@tabler/icons-react'

// constant
const icons = { IconUser }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const operatorSession = {
  id: 'operatorSession',
  title: 'Session',
  type: 'group',
  children: [
    {
      id: 'operatorSession',
      title: 'Session',
      type: 'item',
      url: '/operator/session',
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
}

export default operatorSession
