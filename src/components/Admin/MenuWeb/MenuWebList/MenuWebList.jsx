import { useEffect, useState } from 'react'
import { Button, notification } from 'antd'
import DragSortableList from 'react-drag-sortable'
import MenuItem from './MenuItem'
import Modal from '../../../Modal'
import { menuPutService } from '../../../../api/menu/menuPutService'
import { useFetchMenu } from '../../../../hooks/useFetchMenu'
import './MenuWebList.scss'
import AddMenuWebForm from '../AddMenuWebForm'
import EditMenuWebForm from '../EditMenuWebForm'
import { menuDeleteService } from '../../../../api/menu/menuDeleteService'

const MenuWebList = () => {
  const [isReloadMenu, setIsReloadMenu] = useState(true)
  const [listItems, setListItems] = useState([])
  const { menu } = useFetchMenu(isReloadMenu, setIsReloadMenu)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState(null)
  const addMenuWebModal = () => {
    setIsVisibleModal(true)
    setModalTitle('Creando nuevo menú')
    setModalContent(
      <AddMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setIsReloadMenu={setIsReloadMenu}
      />
    )
  }
  const editMenuWebModal = (menuItem) => {
    setIsVisibleModal(true)
    // eslint-disable-next-line no-debugger
    debugger
    setModalTitle(`Editando menú ${menuItem.title}`)
    setModalContent(
      <EditMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setIsReloadMenu={setIsReloadMenu}
        menuItem={menuItem}
      />
    )
  }
  const deleteMenuWebModal = async (menuItem) => {
    const resp = await menuDeleteService(menuItem._id)
    if (resp.ok) {
      setIsReloadMenu(true)
      notification.success({ message: resp.message })
    }
  }

  useEffect(() => {
    const listItemsArray = []
    menu.forEach((item) => {
      listItemsArray.push({
        content: (
          <MenuItem
            key={item._id}
            item={item}
            editMenuWebModal={editMenuWebModal}
            deleteMenuWebModal={deleteMenuWebModal}
          />
        )
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
        <Button type='primary' onClick={addMenuWebModal}>
          Crear Menú
        </Button>
      </div>
      <div className='menu-web-list__items'>
        <DragSortableList
          items={listItems}
          onSort={onSort}
          dropBackTransitionDuration={0.3}
          type='vertical'
        />
      </div>
      {modalContent && (
        <Modal
          title={modalTitle}
          isVisible={isVisibleModal}
          // eslint-disable-next-line prettier/prettier
          setIsVisible={setIsVisibleModal}
        >
          {modalContent}
        </Modal>
      )}
    </div>
  )
}

// MenuWebList.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   menu: PropTypes.array.isRequired,
//   setReloadMenuWeb: PropTypes.func.isRequired
// }
export default MenuWebList
