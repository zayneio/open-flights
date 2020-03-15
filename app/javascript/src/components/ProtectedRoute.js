// based off this code sand box: https://codesandbox.io/s/p71pr7jn50

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext'

// Redirect users away from these routes if they are NOT logged in
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) => (
      <Route
        render={props =>
          isAuth ? <Component {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute