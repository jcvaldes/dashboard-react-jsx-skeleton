import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Select, notification } from 'antd'
import { signUpPostService } from '../../../api/users/signUpPostService'
import './RegisterForm.scss'

const RegisterForm = () => {
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    const result = await signUpPostService(values)
    if (!result.ok) {
      notification.error({
        message: result.message
      })
    } else {
      notification.success({
        message: result.message
      })
      form.resetFields()
    }
  }
  return (
    <Form
      form={form}
      name='register'
      className='register-form'
      onFinish={handleSubmit}
      scrollToFirstError
      initialValues={{
        email: '',
        name: '',
        lastname: '',
        role: '',
        password: '',
        confirmPassword: '',
        agreement: false
      }}
    >
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
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0, .25)' }} />}
          placeholder='Nombre'
          className='register-form__input'
        />
      </Form.Item>
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
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0, .25)' }} />}
          placeholder='Apellido'
          className='register-form__input'
        />
      </Form.Item>

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
        // eslint-disable-next-line prettier/prettier
        hasFeedback
      >
        <Input
          prefix={<MailOutlined style={{ color: 'rgba(0,0,0, .25)' }} />}
          type='email'
          name='email'
          placeholder='Correo electrónico'
          className='register-form__input'
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
            message: 'Por favor ingresa una contraseña entre 6 y 13 caracteres'
          },
          {
            max: 13,
            message: 'Por favor ingresa una contraseña entre 6 y 13 caracteres'
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
      <Form.Item
        name='confirmPassword'
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Por favor ingresa la confirmación de la contraseña'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Las contraseñas no coinciden'))
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
          className='register-form__input'
        />
      </Form.Item>
      <Form.Item name='gender' requiredMark='optional'>
        <Select
          placeholder='Selecciona tu genero'
          className='register-form__select'
        >
          <Select.Option value='male'>Masculino</Select.Option>
          <Select.Option value='female'>Femenino</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='agreement'
        valuePropName='checked'
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error('Debes aceptar los términos y condiciones')
                  )
          }
        ]}
        // eslint-disable-next-line prettier/prettier
        hasFeedback
      >
        <Checkbox>He leído y acepto los términos y condiciones</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit' className='register-form__button'>
          Crear Cuenta
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm
