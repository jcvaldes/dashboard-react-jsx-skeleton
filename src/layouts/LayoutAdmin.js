import { useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { Layout } from 'antd'
import MenuTop from '../components/Admin/MenuTop'
import './LayoutAdmin.scss'
import useAuth from '../hooks/useAuth'
import MenuSider from '../components/Admin/MenuSider/MenuSider'

const LayoutAdmin = ({ children }) => {
  const [menuCollapsed, setMenuCollapsed] = useState(false)
  const { Header, Content, Footer } = Layout
  const { auth, isLoading } = useAuth()
  return auth && !isLoading ? (
    <Layout>
      <MenuSider menuCollapsed={menuCollapsed} />
      <Layout
        className='layout-admin'
        style={{ marginLeft: menuCollapsed ? '80px' : '200px' }}
      >
        <Header className='layout-admin__header'>
          <MenuTop
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
        </Header>

        <Content className='layout-admin__content'>{children}</Content>
        <Footer className='layout-admin__footer'>Footer</Footer>
      </Layout>
    </Layout>
  ) : (
    <Navigate to='/auth/login' />
  )
}
LayoutAdmin.propTypes = {
  children: PropTypes.node.isRequired
}

export default LayoutAdmin
