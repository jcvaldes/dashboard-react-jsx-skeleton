import { useEffect, useState } from 'react'
import { ErrorHandler } from '../../../interceptors/error-handling.interceptor'
import { menuGetService } from '../../../api/menu/menuGetService'
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList'

const MenuWeb = () => {
  const [menu, setMenu] = useState([])
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false)
  useEffect(() => {
    menuGetService().then((response) => {
      setMenu(response.data.menu)
    })
  }, [reloadMenuWeb])
  return (
    <ErrorHandler>
      <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
    </ErrorHandler>
  )
}

export default MenuWeb
