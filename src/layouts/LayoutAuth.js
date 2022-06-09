import PropTypes from 'prop-types'
import { Layout } from 'antd'
import './LayoutAuth.scss'

const LayoutAuth = ({ children }) => {
  const { Content } = Layout

  return (
    <Layout className='layout-auth'>
      <Content className='layout-auth__content'>{children}</Content>
    </Layout>
  )
}
LayoutAuth.propTypes = {
  children: PropTypes.node.isRequired
}
export default LayoutAuth
