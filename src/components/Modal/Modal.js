import PropTypes from 'prop-types'
import { Modal as ModalAntd } from 'antd'

const Modal = ({ children, title, isVisible, setIsVisible }) => (
  <ModalAntd
    title={title}
    visible={isVisible}
    onCancel={() => setIsVisible(false)}
    centered
    // eslint-disable-next-line prettier/prettier
    footer={false}
  >
    {children}
  </ModalAntd>
)
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired
}
export default Modal
