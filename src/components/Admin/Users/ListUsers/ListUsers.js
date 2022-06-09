/* eslint-disable no-console */
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  StopOutlined
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  List,
  notification,
  Switch,
  Modal as ModalAntd
} from 'antd'
import React, { useEffect, useState } from 'react'
import './ListUsers.scss'
import NoAvatar from '../../../../assets/img/no-avatar.png'
import { useFetchUsers } from '../../../../hooks/useFetchUsers'
import Modal from '../../../Modal'
import EditUserForm from '../EditUserForm'
import { activateUserPutService } from '../../../../api/users/activateUserPutService'
import { userDeleteService } from '../../../../api/users/userDeleteService'
import AddUserForm from '../AddUserForm'

const { confirm } = ModalAntd
const ListUsers = () => {
  const [isReloadUsers, setIsReloadUsers] = useState(true)
  const [active, setActive] = useState(true)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const { users } = useFetchUsers(isReloadUsers, setIsReloadUsers, active)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState(null)

  const addUserModal = () => {
    setIsVisibleModal(true)
    setModalTitle('Creando nuevo usuario')
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setIsReloadUsers={setIsReloadUsers}
      />
    )
  }
  const editUser = (user) => {
    setIsVisibleModal(true)
    setModalTitle(
      `Editar ${user.name ? user.name : '...'} ${
        user.lastname ? user.lastname : '...'
      }`
    )
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setIsReloadUsers={setIsReloadUsers}
      />
    )
  }
  // eslint-disable-next-line no-shadow
  const activeDeactiveUser = async (id, active) => {
    const resp = await activateUserPutService(id, active)
    if (resp.ok) {
      setIsReloadUsers(true)
      notification.success({ message: resp.message })
    }
  }
  const renderActions = (user) => {
    const actionButtons = user.active
      ? [
          <Button type='primary' onClick={() => editUser(user)}>
            <EditOutlined />
          </Button>,
          <Button
            type='danger'
            onClick={() => activeDeactiveUser(user._id, false)}
          >
            <StopOutlined />
          </Button>
        ]
      : [
          <Button
            type='primary'
            onClick={() => activeDeactiveUser(user._id, true)}
          >
            <CheckOutlined />
          </Button>
        ]
    return actionButtons
  }

  const showDeleteConfirm = async (user) => {
    confirm({
      title: `¿Estás seguro de eliminar el usuario ${user.email}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        userDeleteService(user._id).then((resp) => {
          if (resp.ok) {
            setIsReloadUsers(true)
            notification.success({ message: resp.message })
          }
        })
      }
    })
  }

  return (
    <div className='list-users'>
      <div className='list-users__header'>
        <div className='list-users__header-switch'>
          <Switch defaultChecked onChange={() => setActive(!active)} />
          <span>{active ? 'Usuarios Activos' : 'Usuarios Inactivos'}</span>
        </div>
        <Button type='primary' onClick={addUserModal}>
          Crear Usuario
        </Button>
      </div>
      <List
        className='list-users__grid'
        itemLayout='horizontal'
        dataSource={users}
        renderItem={(user) => {
          const avatar = user.avatar
            ? `${process.env.REACT_APP_UPLOADDIR}/avatar/${user.avatar}`
            : NoAvatar
          return (
            <List.Item
              actions={[
                ...renderActions(user),
                <Button type='danger' onClick={() => showDeleteConfirm(user)}>
                  <DeleteOutlined />
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={
                  // <Avatar src={<Image src={avatar} style={{ width: 35 }} />} />
                  <Avatar src={avatar} />
                }
                title={`
                ${user.name ? user.name : '...'}
                ${user.lastname ? user.lastname : '...'}
            `}
                description={user.email}
              />
            </List.Item>
          )
        }}
      />
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

export default ListUsers
