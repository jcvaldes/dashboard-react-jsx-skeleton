import { ErrorHandler } from '../../../interceptors/error-handling.interceptor'
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList'

const MenuWeb = () => {
  return (
    <ErrorHandler>
      <MenuWebList />
    </ErrorHandler>
  )
}

export default MenuWeb
