// assets
import { IconBed } from '@tabler/icons-react'

// constant
const icons = { IconBed }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const beds = {
  id: 'hospitalBeds',
  title: 'Beds',
  type: 'group',
  children: [
    {
      id: 'bedList',
      title: 'Bed Lists',
      type: 'item',
      url: '/hospital/beds',
      icon: icons.IconBed,
      breadcrumbs: false,
    },
  ],
}

export default beds
