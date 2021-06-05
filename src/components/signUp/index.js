import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { loginAction } from '../../Redux/auth/authSlice'
import APIrequest from '../../services/ApiRequest'
import '../../styles/signUp.css'
import ApiEndPoints from '../../utilities/ApiEndPoints'

import { setSessionStorageToken } from '../../utilities/common'
function SignUp() {
  const dispatch = useDispatch()
  const history = useHistory()
  const onFinish = async (values) => {
    const payload = {
      ...ApiEndPoints.signUp,
      bodyData: {
        email: values.email,
        password: values.password,
        age: values.age,
        name: values.name
      }
    }
    const res = await APIrequest(payload)
    if (res.status) {
      history.push('/')
    }
  }
  return (
    <>
      <h2> Signup Form</h2>
      <div className='container'>
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <Form onFinish={onFinish}>
          <label htmlFor='name'>
            <b>Name</b>
          </label>
          <Form.Item name='name'>
            <Input type='text' placeholder='Enter Name' name='name' required />
          </Form.Item>
          <label htmlFor='age'>
            <b>Age</b>
          </label>
          <Form.Item name='age'>
            <Input type='number' placeholder='Enter Age' name='age' required />
          </Form.Item>
          <label htmlFor='email'>
            <b>Email</b>
          </label>
          <Form.Item name='email'>
            <Input
              type='text'
              placeholder='Enter Email'
              name='email'
              required
            />
          </Form.Item>
          <label htmlFor='psw'>
            <b>Password</b>
          </label>
          <Form.Item name='password'>
            <Input
              type='password'
              placeholder='Enter Password'
              name='psw'
              required
            />
          </Form.Item>

          <p>
            By creating an account you agree to our
            <a href='/' style={{ color: 'dodgerblue' }}>
              Terms & Privacy
            </a>
            .
          </p>

          <div className='clearfix'>
            <Link to='/' type='button' className='button cancelbtn'>
              Cancel
            </Link>
            <Button htmlType='submit' className='button signupbtn'>
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default SignUp
