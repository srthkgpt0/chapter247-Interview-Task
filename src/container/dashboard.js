import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import APIrequest from '../services/ApiRequest'
import '../styles/dashboard.css'
import ApiEndPoints from '../utilities/ApiEndPoints'
function Dashboard() {
  const [form] = Form.useForm()
  const userData = useSelector((state) => state.auth.userData)
  useEffect(() => {
    form.setFieldsValue({
      ...userData
    })
  }, [userData])
  const onFinish = async (values) => {
    const payload = {
      ...ApiEndPoints.updateUser,
      bodyData: {
        ...values
      }
    }
    const res = await APIrequest(payload)
    if (res.status) {
      message.success('Successfully Updated', 2)
    }
  }
  return (
    <>
      <main className='mainContent'>
        <h2>Edit Details</h2>
        <Form form={form} onFinish={onFinish}>
          <div className='row'>
            <div className='input'>
              <label>Name</label>
              <Form.Item name='name'>
                <Input type='text' />
              </Form.Item>
            </div>
            <div className='input'>
              <label>Email</label>
              <Form.Item name='email'>
                <Input type='text' />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='input'>
              <label>Age</label>
              <Form.Item name='age'>
                <Input type='number' />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='input'>
              <Button htmlType='submit'>Save</Button>
            </div>
          </div>
        </Form>
      </main>
    </>
  )
}

export default Dashboard
