import { Form, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginAction } from '../../Redux/auth/authSlice'
import APIrequest from '../../services/ApiRequest'
import '../../styles/LoginForm.css'
import ApiEndPoints from '../../utilities/ApiEndPoints'
import { setSessionStorageToken } from '../../utilities/common'
function Login() {
  const dispatch = useDispatch()
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...ApiEndPoints.login,
        bodyData: {
          email: values.email,
          password: values.password
        }
      }
      const res = await APIrequest(payload)
      setSessionStorageToken(res.response.token)
      dispatch(loginAction(res.response.user))
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Form onFinish={handleSubmit}>
      <div className='imgcontainer'>
        <img
          src='https://www.w3schools.com/howto/img_avatar2.png'
          alt='Avatar'
          className='avatar'
        />
      </div>

      <div className='container'>
        <label htmlFor='email'>
          <b>Email</b>
        </label>
        <Form.Item name='email'>
          <Input type='text' placeholder='Enter Email' />
        </Form.Item>
        <label htmlFor='psw'>
          <b>Password</b>
        </label>
        <Form.Item name='password'>
          <Input type='password' placeholder='Enter Password' />
        </Form.Item>
        <button type='submit'>Login</button>
        <label>
          <input type='checkbox' defaultChecked='checked' name='remember' />
          Remember me
        </label>
      </div>

      <div className='container'>
        <Link to='/sign-up' type='button' className='cancelbtn' id='cancelbtn'>
          SignUp
        </Link>
        <span className='psw'>
          Forgot <a href='/'>password?</a>
        </span>
      </div>
    </Form>
  )
}

export default Login
