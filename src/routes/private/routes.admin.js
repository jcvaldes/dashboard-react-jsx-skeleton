import LayoutAdmin from '../../layouts/LayoutAdmin'

// Admin Pages
import AdminHome from '../../pages/Admin'
import AdminUsers from '../../pages/Admin/Users'
import AdminMenu from '../../pages/Admin/MenuWeb'

// Client Pages
import Error404 from '../../pages/Error404'
import Orders from '../../pages/Orders'

const routes = [
  {
    path: '/admin',
    layout: LayoutAdmin,
    component: AdminHome
  },
  {
    path: '/admin/users',
    layout: LayoutAdmin,
    component: AdminUsers
  },
  {
    path: '/admin/menu',
    layout: LayoutAdmin,
    component: AdminMenu
  },
  {
    path: '/admin/orders',
    layout: LayoutAdmin,
    component: Orders
  },
  {
    path: '*',
    layout: LayoutAdmin,
    component: Error404
  }
]
export default routes
