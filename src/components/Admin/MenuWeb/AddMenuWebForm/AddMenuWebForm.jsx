/* eslint-disable react/prop-types */
import './AddMenuWebForm.scss'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, notification, Row, Select } from 'antd'
import { FontSizeOutlined } from '@ant-design/icons'
import { menuPostService } from '../../../../api/menu/menuPostService'

const AddMenuWebForm = ({ setIsVisibleModal, setIsReloadMenu }) => {
  return (
    <div className='add-menu-web-form'>
      <AddForm
        setIsVisibleModal={setIsVisibleModal}
        setIsReloadMenu={setIsReloadMenu}
      />
    </div>
  )
}

const AddForm = ({ setIsVisibleModal, setIsReloadMenu }) => {
  const { Option } = Select
  const [form] = Form.useForm()

  const selectBefore = (
    <Select
      defaultValue='http://'
      style={{ width: 90 }}
      // onChange={(e) => { }}
    >
      <Option value='http://'>http://</Option>
      <Option value='https://'>https://</Option>
    </Select>
  )
  const addMenu = () => {
    // eslint-disable-next-line no-debugger
    debugger
    const http = document.querySelector('.ant-select-selection-item').innerText
    let formData = form.getFieldsValue()
    formData = { ...formData, url: `${http}${formData.url}` }
    setIsVisibleModal(false)
    menuPostService(formData).then(({ data }) => {
      if (!data.ok) {
        notification.error({ message: data.message })
        return
      }
      setIsReloadMenu(true)
      notification.success({ message: data.message })
      form.resetFields()
    })
  }
  return (
    <Form
      form={form}
      className='form-add'
      onFinish={addMenu}
      initialValues={{
        http: 'http://',
        title: null,
        url: null
      }}
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name='title'
            rules={[
              {
                required: true,
                message: 'Por favor ingresa un título'
              }
            ]}
            // eslint-disable-next-line prettier/prettier
            hasFeedback
          >
            <Input
              prefix={<FontSizeOutlined />}
              placeholder='Título'
              // value={menuWebData.title}
              // onChange={(e) =>
              //   setMenuWebData({ ...menuWebData, title: e.target.value })
              // }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name='url'
            rules={[
              {
                required: true,
                message: 'La url es requerida'
              }
            ]}
            // eslint-disable-next-line prettier/prettier
            hasFeedback
          >
            <Input
              addonBefore={selectBefore}
              placeholder='URL'

              // value={menuWebData.url}
              // onChange={(e) =>
              //   setMenuWebData({ ...menuWebData, url: e.target.value })
              // }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='btn-submit'>
          Crear Menú
        </Button>
      </Form.Item>
    </Form>
  )
}
AddMenuWebForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  setIsVisibleModal: PropTypes.func.isRequired,
  setIsReloadMenu: PropTypes.func.isRequired
}
export default AddMenuWebForm
