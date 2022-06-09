import jwtDecode from 'jwt-decode'
import React from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants'
import { useLocalStorage } from './useLocalStorage'

const useToken = (initialValue) => {
  const { saveItem, getItem, removeItem } = useLocalStorage('user', {})
  const [token, setToken] = React.useState(initialValue)

  const verifyToken = (accessToken) => {
    const seconds = 60
    const metaToken = jwtDecode(accessToken)
    const { exp } = metaToken
    const now = (Date.now() + seconds) / 1000
    return now > exp
  }
  const saveToken = (accessToken, refreshToken) => {
    const tokens = {
      accessToken,
      refreshToken
    }
    if (accessToken && refreshToken) {
      setToken(tokens)
      saveItem(ACCESS_TOKEN, accessToken)
      saveItem(REFRESH_TOKEN, refreshToken)
    }
  }
  const clearTokens = () => {
    removeItem('access_token')
    removeItem('refresh_token')
  }
  const getAccessToken = () => {
    const accessToken = JSON.parse(getItem(ACCESS_TOKEN))

    if (!accessToken || accessToken === 'null') {
      return null
    }
    return verifyToken(accessToken) ? null : accessToken
  }

  const getRefreshToken = () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)

    if (!refreshToken || refreshToken === 'null') {
      return null
    }

    return verifyToken(refreshToken) ? null : refreshToken
  }

  const refreshAccessToken = () => {
    const url = `${process.env.REACT_APP_API}/refresh-access-token`
    const bodyObj = {
      refreshToken: getItem(REFRESH_TOKEN)
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(url, params)
      .then((response) => {
        if (response.status !== 200) {
          return null
        }
        return response.json()
      })
      .then((result) => {
        if (!result) {
          clearTokens()
        } else {
          saveToken(result)
        }
      })
  }

  return {
    token,
    getAccessToken,
    getRefreshToken,
    refreshAccessToken,
    saveToken,
    clearTokens
  }
}

export { useToken }
