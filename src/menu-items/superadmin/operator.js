// assets
import { IconUserPlus, IconUser } from '@tabler/icons-react'

// constant
const icons = { IconUserPlus, IconUser }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const operatorSuperAdmin = {
  id: 'operator',
  title: 'Operator',
  type: 'group',
  children: [
    {
      id: 'operatorlist',
      title: 'Operator Lists',
      type: 'item',
      url: '/superadmin/operator/list',
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    {
      id: 'operatorcreate',
      title: 'Create Operator',
      type: 'item',
      url: '/superadmin/operator/create',
      icon: icons.IconUserPlus,
      breadcrumbs: false,
    },
  ],
}

export default operatorSuperAdmin
