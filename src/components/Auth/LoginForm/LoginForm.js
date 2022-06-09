import { useState } from 'react'
import jwtDecode from 'jwt-decode'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification } from 'antd'
import { signInService } from '../../../api/auth/signInPostService'
import useAuth from '../../../hooks/useAuth'
import AuthProvider from '../../../providers/AuthProvider'
import { ErrorHandler } from '../../../interceptors/error-handling.interceptor'
import './LoginForm.scss'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [, setError] = useState(false)
  const { setAuth, saveToken } = useAuth(AuthProvider)
  const [form] = Form.useForm()
  const handleSubmit = async (values) => {
    try {
      setIsLoading(!isLoading)
      const {
        data: { accessToken, refreshToken }
      } = await signInService(values)
      setIsLoading(!isLoading)
      saveToken(accessToken, refreshToken)
      setAuth({
        isLoading: false,
        user: jwtDecode(accessToken)
      })
      notification.success({
        message: 'Usuario autenticado'
      })
      form.resetFields()
      // navigate(ADMIN_DASHBOARD);
    } catch (err) {
      // TODO: hacer el loading y error de forma global
      setIsLoading(false)
      setError(true)
      // notification.error({
      //   message: err.response.data.message
      // })
    }
  }
  return (
    <ErrorHandler>
      <Form
        form={form}
        name='login'
        className='login-form'
        onFinish={handleSubmit}
        scrollToFirstError
        initialValues={{
          email: '',
          password: ''
        }}
      >
        <Form.Item
          name='email'
          // label="email"
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
          hasFeedback
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0, .25)' }} />}
            type='email'
            name='email'
            placeholder='Correo electrónico'
            className='login-form__input'
          />
        </Form.Item>
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
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0, .25)' }} />}
            name='password'
            placeholder='Contraseña'
            className='login-form__input'
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' className='login-form__button'>
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </ErrorHandler>
  )
}

export default LoginForm
