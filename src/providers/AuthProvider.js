import PropTypes from 'prop-types'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'
import { useToken } from '../hooks/useToken'
import { refreshTokenService } from '../api/auth/refreshTokenPostService'

export const AuthContext = createContext()

// eslint-disable-next-line react/function-component-definition
export default function AuthProvider({ children }) {
  const { getAccessToken, getRefreshToken, saveToken, clearTokens } = useToken({
    ACCESS_TOKEN: '',
    REFRESH_TOKEN: ''
  })
  const accessToken = getAccessToken()
  const [auth, setAuth] = useState({
    user: null,
    isLoading: true
  })

  const logout = () => {
    clearTokens()
    setAuth({
      user: null,
      isLoading: true
    })
  }

  const verifyUserLogin = () => {
    if (!accessToken) {
      const refreshAccessToken = getRefreshToken()
      if (!refreshAccessToken) {
        logout()
      } else {
        refreshTokenService(refreshAccessToken)
      }
    } else {
      setAuth({
        isLoading: false,
        user: jwtDecode(accessToken)
      })
    }
  }
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Authprovider paso')
    // esto se ejecuta siempre que se carga una pagina
    verifyUserLogin()
  }, [])
  // axios config
  axios.defaults.baseURL = process.env.REACT_APP_API
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }
  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ auth, setAuth, logout, getAccessToken, saveToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
