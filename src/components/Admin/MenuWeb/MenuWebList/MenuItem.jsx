import PropTypes from 'prop-types'
import { Button, List, Switch } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './MenuItem.scss'

const MenuItem = ({ item }) => {
  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          // onChange={(e) => activateMenu(item, e)}
        />,
        <Button type='primary'>
          <EditOutlined />
        </Button>,
        <Button type='danger'>
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
  item: PropTypes.object.isRequired
}
export default MenuItem
