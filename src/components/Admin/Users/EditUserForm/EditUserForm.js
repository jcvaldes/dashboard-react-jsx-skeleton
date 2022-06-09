/* eslint-disable react/prop-types */
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select
} from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { imageGetService } from '../../../../api/shared/imageGetService'
import { userPutService } from '../../../../api/users/userPutService'
import NoAvatar from '../../../../assets/img/no-avatar.png'
import './EditUserForm.scss'

const EditUserForm = ({ user, setIsVisibleModal, setIsReloadUsers }) => {
  const [avatar, setAvatar] = useState(null)
  const [userData, setUserData] = useState({})
  useEffect(() => {
    setUserData({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      password: ''
    })
  }, [user])

  useEffect(() => {
    if (user.avatar) {
      imageGetService('avatar', user._id).then((resp) => {
        setAvatar(resp)
      })
    } else {
      setAvatar(null)
    }
  }, [user])

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file })
    }
  }, [avatar])

  const updateUser = async () => {
    const resp = await userPutService(userData)
    if (resp.ok) {
      setIsVisibleModal(false)
      setIsReloadUsers(true)
      notification.success({ message: resp.message })
    }
  }

  return (
    <div className='edit-user-form'>
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      {/* {user.email} */}
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  )
}
const UploadAvatar = (props) => {
  const { avatar, setAvatar } = props
  const [avatarUrl, setAvatarUrl] = useState(null)
  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview)
      } else {
        setAvatarUrl(avatar)
      }
    } else {
      setAvatarUrl(null)
    }
  }, [avatar])

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      setAvatar({ file, preview: URL.createObjectURL(file) })
    },
    [setAvatar]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop
  })

  return (
    <div className='upload-avatar' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl || NoAvatar} />
      )}
    </div>
  )
}

const EditForm = ({ userData, setUserData, updateUser }) => {
  const { Option } = Select
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
      role: userData.role,
      password: userData.password,
      confirmPassword: userData.confirmPassword
    })
  }, [userData])

  return (
    <Form
      form={form}
      className='form-edit'
      onFinish={updateUser}
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
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
          <Form.Item>
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
              <Option value='admin'>Administrador</Option>
              <Option value='editor'>Editor</Option>
              <Option value='reviewer'>Revisor</Option>
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
                // eslint-disable-next-line no-debugger
                debugger
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
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='btn-submit'>
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditUserForm
