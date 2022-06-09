import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import DragSortableList from 'react-drag-sortable'
import MenuItem from './MenuItem'

import './MenuWebList.scss'
import { menuPutService } from '../../../../api/menu/menuPutService'

const MenuWebList = ({ menu, setReloadMenuWeb }) => {
  const [listItems, setListItems] = useState([])
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState(null)

  useEffect(() => {
    const listItemsArray = []
    menu.forEach((item) => {
      listItemsArray.push({
        content: <MenuItem item={item} />
      })
      setListItems(listItemsArray)
    })
  }, [menu])
  const onSort = (sortedList, dropEvent) => {
    sortedList.forEach((item) => {
      const { _id } = item.content.props.item
      const order = item.rank
      menuPutService(_id, { order })
    })
  }

  return (
    <div className='menu-web-list'>
      <div className='menu-web-list__header'>
        <Button type='primary'>Menu Web</Button>
      </div>
      <div className='menu-web-list__items'>
        <DragSortableList items={listItems} onSort={onSort} type='vertical' />
      </div>
    </div>
  )
}

MenuWebList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  menu: PropTypes.array.isRequired,
  setReloadMenuWeb: PropTypes.func.isRequired
}
export default MenuWebList
