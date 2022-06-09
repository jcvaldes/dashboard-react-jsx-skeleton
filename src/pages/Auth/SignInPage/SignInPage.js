import { Tabs } from 'antd'
import React from 'react'
import { Navigate } from 'react-router-dom'
import LoginForm from '../../../components/Auth/LoginForm'
import RegisterForm from '../../../components/Auth/RegisterForm/RegisterForm'
import Logo from '../../../assets/img/logo-white-shadow.png'
import './SignInPage.scss'
import useAuth from '../../../hooks/useAuth'
import AuthProvider from '../../../providers/AuthProvider'
import { ADMIN_DASHBOARD } from '../../../utils/constants'

const SignInPage = () => {
  const { TabPane } = Tabs
  const { getAccessToken } = useAuth(AuthProvider)
  const token = getAccessToken()
  return token ? (
    <Navigate to={`${ADMIN_DASHBOARD}`} />
  ) : (
    <>
      <h1 className='signin-page-logo'>
        <img src={Logo} alt='logo' />
      </h1>
      <div className='signin-page-tabs'>
        <Tabs type='card'>
          <TabPane tab={<span>Entrar</span>} key='1'>
            <LoginForm />
          </TabPane>
          <TabPane tab={<span>Nuevo usuario</span>} key='2'>
            <RegisterForm />
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default SignInPage
