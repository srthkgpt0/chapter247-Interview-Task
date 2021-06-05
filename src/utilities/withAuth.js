import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  redirectPathIfNotRequiredAuthFails,
  redirectPathIfRequireAuthFails
} from './routes'
import { item as Routes } from './sidebar'

import { getSessionStorageToken } from './common'
import { logoutAction } from '../Redux/auth/authSlice'

export default function (ComposedComponent) {
  class WithAuth extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        isAuthenticated: false
      }
    }
    componentDidMount() {
      this.checkAuth()
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.auth.isLoggedIn !== this.props.auth.isLoggedIn) {
        this.setState(
          {
            isAuthenticated: false
          },
          () => {
            this.checkAuth()
          }
        )
      }
    }

    checkAuth = () => {
      const isLoggedInProps = this.props.auth.isLoggedIn
      const userType = 'admin'
      const path = this.props.match.path
      const routePaths = this.getRouteArray(userType, true)
      const notRequiredAuthPaths = this.getRouteArray(userType, false)
      console.log(isLoggedInProps, 'isLoggedInProps')
      console.log(path, 'path')
      console.log(routePaths, 'routePaths')
      console.log(notRequiredAuthPaths, 'notRequiredAuthPaths')

      if (routePaths.includes(path) && !isLoggedInProps) {
        console.log('Here i am')
        this.props.history.push({
          pathname: redirectPathIfRequireAuthFails
        })
      } else if (
        (notRequiredAuthPaths.includes(path) || !routePaths.includes(path)) &&
        isLoggedInProps
      ) {
        console.log('Here i am')
        if (getSessionStorageToken()) {
          console.log('Here i am')
          this.props.history.push({
            pathname: this.redirectOn(userType)
          })
        } else {
          console.log('Here i am')
          this.props.logoutRedux()
        }
      } else {
        console.log('Here i am')
        this.setState({
          isAuthenticated: true
        })
      }
    }
    redirectOn = (type) => {
      let redirectOn = ''
      for (
        let index = 0;
        index < redirectPathIfNotRequiredAuthFails.length;
        index++
      ) {
        const element = redirectPathIfNotRequiredAuthFails[index]
        if (element.userTypes && element.userTypes.includes(type)) {
          redirectOn = element.path
        }
      }
      return redirectOn
    }
    getRouteArray = (type = 'all', authReq) => {
      let pathArr = []
      for (let index = 0; index < Routes.length; index++) {
        const element = Routes[index]
        if (element.child && element.child.length > 0) {
          for (let indexJ = 0; indexJ < element.child.length; indexJ++) {
            const elementJ = element.child[indexJ]
            if (
              elementJ.userTypes &&
              (elementJ.userTypes.includes(type) || type === 'all') &&
              elementJ.authRequire === authReq
            ) {
              pathArr.push(elementJ.endPoint)
            }
          }
        } else {
          if (
            element.userTypes &&
            (element.userTypes.includes(type) || type === 'all') &&
            element.authRequire === authReq
          ) {
            pathArr.push(element.endPoint)
          }
        }
      }
      return pathArr
    }

    render() {
      const { isAuthenticated } = this.state
      if (isAuthenticated) {
        return (
          <>
            <ComposedComponent {...this.props} />
          </>
        )
      }

      return <div>Loading...</div>
    }
  }
  const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      logoutRedux: (res) => dispatch(logoutAction(res))
    }
  }
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth))
}
