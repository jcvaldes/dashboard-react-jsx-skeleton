import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

import AuthProvider from '../providers/AuthProvider'

const ProtectedRoutes = () => {
  const { getAccessToken } = useAuth(AuthProvider)
  const token = getAccessToken()
  return token ? <Outlet /> : <Navigate to='/auth/login' />
}

export default ProtectedRoutes
