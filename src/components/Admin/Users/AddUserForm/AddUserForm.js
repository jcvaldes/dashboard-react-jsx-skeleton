/* eslint-disable react/prop-types */
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, notification, Row, Select } from 'antd'

import { useState } from 'react'
import { signUpPostService } from '../../../../api/users/signUpPostService'
import './AddUserForm.scss'

const AddUserForm = ({ setIsVisibleModal, setIsReloadUsers }) => {
  const [userData, setUserData] = useState({})

  return (
    <div className='add-user-form'>
      <AddForm
        userData={userData}
        setUserData={setUserData}
        setIsVisibleModal={setIsVisibleModal}
        setIsReloadUsers={setIsReloadUsers}
      />
    </div>
  )
}

const AddForm = ({
  userData,
  setUserData,
  setIsVisibleModal,
  setIsReloadUsers
}) => {
  const { Option } = Select
  const [form] = Form.useForm()
  const addUser = () => {
    // e.preventDefault()
    setIsVisibleModal(false)
    signUpPostService(userData).then((resp) => {
      if (!resp.ok) {
        notification.error({ message: resp.message })
        return
      }
      setIsReloadUsers(true)
      notification.success({ message: resp.message })
      form.resetFields()
    })
  }
  return (
    <Form
      form={form}
      className='form-add'
      onFinish={addUser}
      initialValues={{
        name: null,
        lastname: null,
        email: null,
        role: null,
        password: null,
        confirmPassword: null
      }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu nombre'
              }
            ]}
            // eslint-disable-next-line prettier/prettier
            hasFeedback
          >
            <Input
              prefix={<UserOutlined />}
              placeholder='Nombre'
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='lastname'
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu apellido'
              }
            ]}
            // eslint-disable-next-line prettier/prettier
            hasFeedback
          >
            <Input
              prefix={<UserOutlined />}
              placeholder='Apellidos'
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu correo electrónico'
              },
              {
                type: 'email',
                message: 'Por favor ingresa un correo electrónico válido'
              }
            ]}
            // eslint-disable-next-line prettier/prettier
            hasFeedback
          >
            <Input
              prefix={<MailOutlined />}
              placeholder='Correo electrónico'
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='role'
            rules={[
              {
                required: true,
                message: 'Por favor ingresa un rol'
              }
            ]}
            // eslint-disable-next-line prettier/prettier
            hasFeedback
          >
            <Select
              placeholder='Selecciona un rol'
              onChange={(e) =>
                setUserData({
                  ...userData,
                  role: e
                })
              }
              value={userData.role}
            >
              <Option value='ADMIN'>Administrador</Option>
              <Option value='EDITOR'>Editor</Option>
              <Option value='REVIEWER'>Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Por favor ingresa una contraseña'
              },
              {
                min: 6,
                message:
                  'Por favor ingresa una contraseña entre 6 y 13 caracteres'
              },
              {
                max: 13,
                message:
                  'Por favor ingresa una contraseña entre 6 y 13 caracteres'
              }
            ]}
            // eslint-disable-next-line prettier/prettier
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0, .25)' }} />}
              type='password'
              placeholder='Contraseña'
              onChange={(e) => {
                return setUserData({
                  ...userData,
                  password: e.currentTarget.value
                })
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='confirmPassword'
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Por favor confirma la contraseña'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Las contraseñas no coinciden')
                  )
                }
              })
            ]}
            // eslint-disable-next-line prettier/prettier
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0, .25)' }} />}
              type='password'
              placeholder='Confirmar Contraseña'
              onChange={(e) => {
                return setUserData({
                  ...userData,
                  confirmPassword: e.currentTarget.value
                })
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='btn-submit'>
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddUserForm
