// import dashboard from './dashboard'
import dashboard from './superadmin/dashboard'
import hospital from './superadmin/hospital'
import operatorSuperAdmin from './superadmin/operator'
import user from './superadmin/user'
import driver from './superadmin/driver'
import beds from './hospital/beds'
import hospitalProfile from './hospital/hospitalProfile'
import operatorProfile from './operator/operatorProfile'
import operatorSession from './operator/operatorSession'
import other from './other'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (role) => {
  switch (role) {
    case 'operator':
      return {
        items: [dashboard, operatorSession, operatorProfile],
      }
    case 'hospital':
      return {
        items: [dashboard, beds, hospitalProfile],
      }
    case 'superadmin':
      return {
        items: [dashboard, hospital, operatorSuperAdmin, user, driver],
      }
    default:
      return {
        items: [other], // default or guest menu
      }
  }
}

export default menuItems
