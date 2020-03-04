import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Airlines from './Airlines/Airlines'
import Airline from './Airline/Airline'
import axios from 'axios'

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(false)

  useEffect( () => authenticate(), [])

  const authenticate = () => {
    axios.get('/api/v1/auth/logged_in', { withCredentials: true })
    .then(resp => {
      console.log('response', resp.data)
      setCurrentUser(resp.data.logged_in)
    })
    .catch(resp => setCurrentUser(false) )
  }

  return(
    <Switch>
      <Route exact path="/" render={ props => <Airlines { ...props } currentUser={currentUser} /> } />
      <Route exact path="/airlines/:slug" render={ props => <Airline { ...props } currentUser={currentUser} /> } />
      <Route exact path="/login" render={ props => <Login { ...props } currentUser={currentUser} /> } />
      <Route exact path="/register" render={ props => <Register { ...props } currentUser={currentUser} /> } />
    </Switch>
  )
}

export default App
