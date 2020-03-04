import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Airlines from './Airlines/Airlines'
import Airline from './Airline/Airline'

const App = (props) => {
  return(
    <Switch>
      <Route exact path="/" component={Airlines} />
      <Route exact path="/airlines/:slug" component={Airline} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  )
}

export default App
