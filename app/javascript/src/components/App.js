import React, { Component, createContext } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Airlines from './Airlines/Airlines'
import Airline from './Airline/Airline'
import Authenticate from '../utils/Auth/Authenticate'
import Navbar from './Navbar'
import FakeParent from './FakeParent'

class App extends Component {
  render(){
    return(
      <FakeParent>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Airlines} />
          <Route exact path="/airlines/:slug" component={Airline} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </FakeParent>
    )
  }
}

export default App
