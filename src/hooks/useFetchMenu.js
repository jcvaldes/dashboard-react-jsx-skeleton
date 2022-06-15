// agrupo logica
import { useEffect, useState } from 'react'
import { menuGetService } from '../api/menu/menuGetService'

export const useFetchMenu = (isReloadMenu, setIsReloadMenu) => {
  const [state, setState] = useState({
    menu: [],
    loading: true
  })
  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger
    // eslint-disable-next-line no-shadow
    menuGetService().then(({ data: { menu } }) => {
      setState({
        menu,
        loading: false
      })
      // setIsReloadMenu((prevState) => !prevState)
    })
  }, [])
  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger
    if (isReloadMenu) {
      // eslint-disable-next-line no-shadow
      menuGetService().then(({ data: { menu } }) => {
        setState({
          menu,
          loading: false
        })
      })
      setIsReloadMenu((prevState) => !prevState)
    }
  }, [isReloadMenu])
  return state
}
