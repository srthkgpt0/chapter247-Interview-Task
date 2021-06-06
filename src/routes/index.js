import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../components/login'
import SignUp from '../components/signUp'
import Dashboard from '../container/dashboard'
import LoginLayout from '../layouts/login'
import MainLayout from '../layouts/main'
import WithAuth from '../utilities/withAuth'
import RouteWithLayout from './RouteWithLayout'
function Routes() {
  return (
    <Switch>
      <RouteWithLayout component={Login} exact layout={LoginLayout} path='/' />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={MainLayout}
        path='/dashboard'
      />
      <RouteWithLayout
        component={SignUp}
        exact
        layout={LoginLayout}
        path='/sign-up'
      />
    </Switch>
  )
}

export default Routes
