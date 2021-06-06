import { Button, Form, Input, message, Space, Table, Tag, Upload } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import APIrequest from '../services/ApiRequest'
import '../styles/dashboard.css'
import ApiEndPoints from '../utilities/ApiEndPoints'
import { getFile } from '../utilities/common'
function Dashboard() {
  const [form] = Form.useForm()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]
  // const generateQueryString = (type, queryParams) => {
  //   const queryString = new URLSearchParams(queryParams)
  //   return queryString.toString()
  // }
  const getCSV = async () => {
    try {
      const type = 'csv'
      await getFile(ApiEndPoints.USER_LIST_FILE_DOWNLOAD.url)
    } catch (error) {}
  }
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
  return (
    <>
      <main className='mainContent'>
        <div className='row'>
          <h2>Users List</h2>
          <div className='impexpbtn'>
            <Upload {...props}>
              <Button>Import List</Button>
            </Upload>
            <Button onClick={() => getCSV()}>Export List</Button>
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
      </main>
    </>
  )
}

export default Dashboard
{
  /* <h2>Edit Details</h2>
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
        </Form> */
}
