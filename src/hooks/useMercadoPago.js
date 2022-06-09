// agrupo logica
import React, { useEffect } from 'react'
import { usersGetService } from '../api/users/usersGetService'

export const useMercadoPago = (isActive = true) => {
  const [state, setState] = React.useState({
    users: [],
    loading: true
  })
  // los efectos nunca pueden ser async
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
