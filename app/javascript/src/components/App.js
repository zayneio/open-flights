import React, { Component, Fragment } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Airlines from './Airlines/Airlines'
import Airline from './Airline/Airline'
import Authenticate from '../utils/Auth/Authenticate'
import Navbar from './Navbar'
import axios from 'axios'
import AxiosHelper from '../utils/Requests/AxiosHelper'
import { AuthProvider } from './AuthContext'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      auth: false
    }
  }

  componentDidMount(){
    Authenticate()
    .then( (resp) => this.setState({ auth: resp }) )
    .catch( err => console.log(err))
  }

  handleLogOut = () => {
    AxiosHelper()
    axios.delete('/api/v1/auth/logout')
    .then( resp => this.props.history.push('/'))
    .catch( err => console.log(err))
  }

  render(){
    return(
      <AuthProvider>
        <Navbar handleLogOut={this.handleLogOut} auth={this.state.auth}/>
        <Switch>
          <Route exact path="/" component={Airlines} />
          <Route exact path="/airlines/:slug" component={Airline} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </AuthProvider>
    )
  }
}

export default App
