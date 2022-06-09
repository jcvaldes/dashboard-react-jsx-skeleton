// agrupo logica
import React, { useEffect } from 'react'
import { usersGetService } from '../api/users/usersGetService'

export const useFetchUsers = (
  isReloadUsers,
  setIsReloadUsers,
  isActive = true
) => {
  const [state, setState] = React.useState({
    users: [],
    loading: true
  })
  // los efectos nunca pueden ser async
  useEffect(() => {
    if (isReloadUsers) {
      usersGetService(isActive).then(({ data: { users } }) => {
        setState({
          users,
          loading: false
        })
        setIsReloadUsers((prevState) => !prevState)
      })
    }
  }, [isReloadUsers])

  useEffect(() => {
    usersGetService(isActive).then(({ data: { users } }) => {
      setState({
        users,
        loading: false
      })
    })
  }, [isActive])

  return state
}
