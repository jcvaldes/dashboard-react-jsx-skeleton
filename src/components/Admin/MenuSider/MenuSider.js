import {
  FormOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
  SnippetsOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import './MenuSider.scss'

const MenuSider = ({ menuCollapsed }) => {
  const { Sider } = Layout
  const { logout } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return (
    <Sider className='admin-sider' collapsed={menuCollapsed}>
      <Menu
        theme='dark'
        mode='inline'
        // defaultSelectedKeys={pathname}
        selectedKeys={pathname}
        items={[
          {
            key: '/admin',
            icon: <HomeOutlined />,
            label: `Dashboard`,
            onClick: () => {
              navigate('/admin')
            }
          },
          {
            key: '/admin/users',
            icon: <UsergroupAddOutlined />,
            label: `Usuarios`,
            onClick: () => {
              navigate('/admin/users')
            }
          },
          {
            key: '/admin/menu',
            icon: <MenuFoldOutlined />,
            label: `Menú`,
            onClick: () => {
              navigate('/admin/menu')
            }
          },
          {
            key: '/admin/logout',
            icon: <PoweroffOutlined />,
            label: `Salir`,
            onClick: () => {
              logout()
            }
          }
        ]}
      />
    </Sider>
  )
}

MenuSider.propTypes = {
  menuCollapsed: PropTypes.bool.isRequired
}
export default MenuSider
