import { message } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutAction } from '../../Redux/auth/authSlice'
import APIrequest from '../../services/ApiRequest'
import '../../styles/header.css'
import ApiEndPoints from '../../utilities/ApiEndPoints'
import { removeSessionStorageToken } from '../../utilities/common'
function Header() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutAction())
    removeSessionStorageToken()
  }
  const handleDelete = () => {
    try {
      const payload = {
        ...ApiEndPoints.deleteUser
      }
      const res = APIrequest(payload)
      if (res.status) {
        message.success('Deleted Successfully', 2)
      }
      dispatch(logoutAction())
      removeSessionStorageToken()
    } catch (error) {
      message.success(error, 2)
    }
  }
  return (
    <div className='topnav' id='myTopnav'>
      <a href='#home' className='active'>
        Home
      </a>
      <a href='#news'>News</a>
      <a href='#contact'>Contact</a>
      <a href='#about'>About</a>
      <a href='/' className='icon'>
        <i className='fa fa-bars'></i>
      </a>
      <div>
        <Link to='#' onClick={() => handleLogout()}>
          Logout
        </Link>
      </div>
      <div>
        <Link to='#' onClick={() => handleDelete()}>
          Delete User
        </Link>
      </div>
    </div>
  )
}

export default Header
