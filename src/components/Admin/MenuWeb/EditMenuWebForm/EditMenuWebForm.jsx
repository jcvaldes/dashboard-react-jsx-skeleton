/* eslint-disable react/prop-types */
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, notification, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import { menuPutService } from '../../../../api/menu/menuPutService'
import './EditMenuWebForm.scss'

const EditMenuWebForm = ({ menuItem, setIsVisibleModal, setIsReloadMenu }) => {
  const [menuWebData, setMenuWebData] = useState(menuItem)
  // useEffect(() => {
  //   setMenuWebData({
  //     _id: menuItem._id,
  //     title: menuItem.title,
  //     url: menuItem.url
  //   })
  // }, [menuItem])

  return (
    <div className='edit-menu-web-form'>
      <EditForm
        menuItem={menuItem}
        setIsVisibleModal={setIsVisibleModal}
        setIsReloadMenu={setIsReloadMenu}
      />
    </div>
  )
}

const EditForm = ({ menuItem, setIsVisibleModal, setIsReloadMenu }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      _id: menuItem._id,
      title: menuItem.title,
      url: menuItem.url
    })
  }, [menuItem])

  const updateMenu = () => {
    // eslint-disable-next-line no-debugger
    debugger
    setIsVisibleModal(false)
    menuPutService(form.getFieldValue()).then(({ data }) => {
      // eslint-disable-next-line no-debugger
      debugger
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
      className='form-edit'
      onFinish={updateMenu}
      initialValues={{
        _id: null,
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
              },
              {
                type: 'url',
                message: 'Ingresa una url válida'
              }
            ]}
            // eslint-disable-next-line prettier/prettier
            hasFeedback
          >
            <Input
              prefix={<LinkOutlined />}
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
          Actualizar Menú
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditMenuWebForm
