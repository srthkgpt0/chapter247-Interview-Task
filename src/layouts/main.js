import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/header'
import SideBar from '../components/sidebar'

const MainLayout = (props) => {
  const { children } = props

  return (
    <>
      <Header />
      <SideBar />
      {children}
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.any.isRequired
}

export default MainLayout
