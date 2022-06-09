import PropTypes from 'prop-types'
import { Button } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import './MenuTop.scss'
import logo from '../../../assets/img/logo-white.png'

const MenuTop = ({ menuCollapsed, setMenuCollapsed }) => {
  const { logout } = useAuth()
  const handleToggle = () => {
    setMenuCollapsed((prevState) => !prevState)
  }
  return (
    <div className='menu-top'>
      <div className='menu-top__left'>
        <Link to='/admin'>
          <img className='menu-top__left-logo' src={logo} alt='logo' />
        </Link>
        <Button type='link' onClick={handleToggle}>
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className='menu-top__right'>
        <Button type='link' onClick={logout}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  )
}

MenuTop.propTypes = {
  menuCollapsed: PropTypes.bool.isRequired,
  setMenuCollapsed: PropTypes.func.isRequired
}
export default MenuTop
