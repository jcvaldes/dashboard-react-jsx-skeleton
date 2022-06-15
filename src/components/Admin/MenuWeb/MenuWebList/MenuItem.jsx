import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, List, notification, Switch } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './MenuItem.scss'
import { menuPutService } from '../../../../api/menu/menuPutService'

const MenuItem = ({ item, editMenuWebModal, deleteMenuWebModal }) => {
  const [active, setActive] = useState(true)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  // const { users } = useFetchUsers(isReloadUsers, setIsReloadUsers, active)
  // const [modalTitle, setModalTitle] = useState('')
  // const [modalContent, setModalContent] = useState(null)

  // eslint-disable-next-line no-shadow
  const activeDeactiveUser = async (item) => {
    const resp = await menuPutService(item._id, { active: !item.active })
    notification.success({ message: 'Menú actualizado correctamente.' })
  }

  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={(e) => activeDeactiveUser(item)}
        />,
        <Button type='primary'>
          <EditOutlined onClick={() => editMenuWebModal(item)} />
        </Button>,
        <Button type='danger' onClick={() => deleteMenuWebModal(item)}>
          <DeleteOutlined />
        </Button>
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  )
}

MenuItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  editMenuWebModal: PropTypes.func.isRequired,
  deleteMenuWebModal: PropTypes.func.isRequired
}
export default MenuItem
