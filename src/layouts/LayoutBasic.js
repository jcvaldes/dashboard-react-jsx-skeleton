import PropTypes from 'prop-types'
import { Layout } from 'antd'
import './LayoutBasic.scss'

const LayoutBasic = ({ children }) => {
  const { Content, Footer } = Layout
  return (
    <Layout>
      <h2>Menu </h2>
      <Layout>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}
LayoutBasic.propTypes = {
  children: PropTypes.node.isRequired
}

export default LayoutBasic
