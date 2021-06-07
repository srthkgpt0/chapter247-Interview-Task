import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Upload
} from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { loginAction } from '../../Redux/auth/authSlice'
import APIrequest from '../../services/ApiRequest'

import ApiEndPoints from '../../utilities/ApiEndPoints'
import '../../styles/signUp.css'
import { setSessionStorageToken } from '../../utilities/common'
// import UploadMedia from '../mediaUpload'
function SignUp() {
  const [countryList, setCountryList] = useState([])
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const [code, setCode] = useState([])
  const [countryName, setCountryName] = useState('')
  const [cityName, setCityName] = useState('')
  const [stateName, setStateName] = useState('')
  const [checkboxValues, setCheckboxValues] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    getCountryData()
  }, [])
  const getCountryData = async () => {
    try {
      const res = await axios(
        'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json'
      )
      const codeRes = await axios(
        'https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json'
      )

      setCode(codeRes.data)
      setCountryList(res.data)
    } catch (error) {}
  }
  const handleCountryChange = async (values) => {
    try {
      setCountryName(values[0])
      const res = await axios(
        'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json'
      )
      const stateRes = res.data.filter((st) => st.country_id === values[1])
      setStateList(stateRes)
    } catch (error) {}
  }
  const handleStateChange = async (values) => {
    try {
      setStateName(values[0])
      const res = await axios(
        'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json'
      )
      const cityRes = res.data.filter((city) => city.state_id === values[1])
      setCityList(cityRes)
    } catch (error) {}
  }
  const handleCityChange = (values) => {
    setCityName(values)
  }
  const onFinish = async (values) => {
    if (values.dob) {
      values.dob = values.dob.format('DD/MM/YYYY')
    }
    console.log(values, 'values')

    const payload = {
      ...ApiEndPoints.signUp,
      bodyData: {
        email: values.email,
        password: values.password,
        age: values.age,
        name: values.name,
        state: stateName,
        country: countryName,
        city: cityName,
        skills: checkboxValues,
        dob: values.dob,
        gender: values.gender,
        prefix: values.prefix,
        phone: values.phone,
        photo: values.photo
      }
    }
    console.log(payload)
    const res = await APIrequest(payload)
    if (res.status) {
      message.success('Signed up successfully', 2)
      history.push('/')
    }
  }
  const props = {
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
  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select style={{ width: 70 }}>
        {code &&
          code.map((code, index) => (
            <Select.Option key={index} value={code.dial_code}>
              {code.dial_code}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  )
  const checkboxOptions = [
    {
      label: 'Developer',
      value: 'developer'
    },
    {
      label: 'QA',
      value: 'qa'
    },
    {
      label: 'BDE',
      value: 'bde'
    },
    {
      label: 'BA',
      value: 'ba'
    },
    {
      label: 'HR',
      value: 'hr'
    }
  ]
  const handleCheckboxChange = (values) => {
    setCheckboxValues(values)
  }
  const disabledDate = (current) => {
    const now = new Date()
    if (now.getFullYear() - current.year() < 18) {
      return false
    }
    return true
    // if(current.year()
  }
  const handlePhotoInput = (values) => {
    console.log(values)
  }
  return (
    <>
      <div className='main-content'>
        <h2> Signup Form</h2>
        <div className='container'>
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <Form onFinish={onFinish}>
            <label htmlFor='email'>
              <b>Email</b>
            </label>
            <Form.Item
              name='email'
              rules={[{ required: true, message: 'Please enter email' }]}
            >
              <Input type='text' placeholder='Enter Email' />
            </Form.Item>
            <label htmlFor='image'>
              <b>Upload Profile Image</b>
            </label>
            <Form.Item
              name='image'
              rules={[{ required: true, message: 'Please enter Avatar' }]}
            >
              <input type='file' onSelect={() => handlePhotoInput()} />
            </Form.Item>
            <label htmlFor='name'>
              <b>Name</b>
            </label>
            <Form.Item
              name='name'
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input type='text' placeholder='Enter Name' />
            </Form.Item>
            <label htmlFor='age'>
              <b>Age</b>
            </label>
            <Form.Item
              name='age'
              rules={[{ required: true, message: 'Please enter age' }]}
            >
              <Input type='number' placeholder='Enter Age' />
            </Form.Item>
            <label htmlFor='gender'>
              <b>Gender</b>
            </label>
            <Form.Item
              name='gender'
              rules={[{ required: true, message: 'Please select a gender' }]}
            >
              <Select>
                <Select.Option value='male'>Male</Select.Option>
                <Select.Option value='female'>Female</Select.Option>
              </Select>
            </Form.Item>
            <label htmlFor='country'>
              <b>Country</b>
            </label>
            <Form.Item name='country'>
              <Select onChange={handleCountryChange}>
                {countryList &&
                  countryList.map((cntry, index) => (
                    <Select.Option key={index} value={[cntry.name, cntry.id]}>
                      {cntry.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <label htmlFor='state'>
              <b>State</b>
            </label>
            <Form.Item name='state'>
              <Select onChange={handleStateChange}>
                {stateList &&
                  stateList.map((st, index) => (
                    <Select.Option key={index} value={[st.name, st.id]}>
                      {st.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <label htmlFor='city'>
              <b>City</b>
            </label>
            <Form.Item name='city'>
              <Select onChange={handleCityChange}>
                {cityList &&
                  cityList.map((cty, index) => (
                    <Select.Option key={index} value={cty.name}>
                      {cty.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <label htmlFor='phone'>
              <b>phone</b>
            </label>
            <Form.Item
              name='phone'
              rules={[
                { required: true, message: 'Please input your phone number!' }
              ]}
            >
              <Input addonBefore={prefixSelector} />
            </Form.Item>
            <label htmlFor='skills'>
              <b>Skills</b>
            </label>
            <Form.Item>
              <Checkbox.Group
                options={checkboxOptions}
                onChange={handleCheckboxChange}
              />
            </Form.Item>
            <label htmlFor='dob'>
              <b>Date of Birth</b>
            </label>
            <Form.Item
              name='dob'
              rules={[
                { required: true, message: 'Please select date of birth' }
              ]}
            >
              <DatePicker format='DD/MM/YYYY' disabledDate={disabledDate} />
            </Form.Item>
            <label htmlFor='password'>
              <b>Password</b>
            </label>
            <Form.Item
              name='password'
              rules={[{ required: true, message: 'Please enter password   ' }]}
            >
              <Input type='password' placeholder='Enter Password' />
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
              <Button htmlType='submit' className='button' id='signupbtn'>
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SignUp
