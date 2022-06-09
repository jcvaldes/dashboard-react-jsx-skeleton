import LayoutBasic from '../layouts/LayoutBasic'
import LayoutAuth from '../layouts/LayoutAuth'

// Client Pages
import Home from '../pages/Home'
import SignInPage from '../pages/Auth/SignInPage'
import Contact from '../pages/Contact'
import Error404 from '../pages/Error404'

const routes = [
  {
    path: '/auth/login',
    layout: LayoutAuth,
    component: SignInPage
  },
  {
    path: '/',
    layout: LayoutBasic,
    component: Home
  },
  {
    path: '/contact',
    layout: LayoutBasic,
    component: Contact
  },
  {
    path: '*',
    layout: LayoutBasic,
    component: Error404
  }
]

export default routes
