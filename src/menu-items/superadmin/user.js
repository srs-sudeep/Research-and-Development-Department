// assets
import { IconUser } from '@tabler/icons-react'

// constant
const icons = { IconUser }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const userSuperAdmin = {
  id: 'user',
  title: 'User',
  type: 'group',
  children: [
    {
      id: 'userlist',
      title: 'User Lists',
      type: 'item',
      url: '/superadmin/user/list',
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
}

export default userSuperAdmin
