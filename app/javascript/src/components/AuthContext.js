import React, {Component, createContext} from 'react'
import axios from 'axios'
import AxiosHelper from '../utils/Requests/AxiosHelper'
import Authenticate from '../utils/Auth/Authenticate'

const AuthContext = createContext()

class AuthProvider extends Component {
  state = { isAuth: false, email: '' }

  constructor(props){
    super(props)
  }

  componentDidMount(){
    Authenticate()
    .then( (resp) => this.setState({ ...resp }) )
    .catch( err => console.log(err))
  }

  login = (user, props, e) => {
    e.preventDefault()

    AxiosHelper()
    axios.post('/api/v1/auth', { user: { ...user } }, { withCredentials: true })
    .then( _resp => {
      this.setState({ isAuth: true })
      props.history.push("/")
    })
    .catch( err => console.log(err))
  }

  signup = (user, props, e) => {
    e.preventDefault()

    AxiosHelper()
    axios.post('/api/v1/registrations', { user: { ...user } }, { withCredentials: true })
    .then( resp => {
      this.setState({ isAuth: true })
      props.history.push("/")
    })
    .catch( err => console.log(err))
  }

  forgotPass = (user, props, e) => {
    e.preventDefault()

    AxiosHelper()
    axios.post('/api/v1/auth/password/forgot', { email: user.email })
    .then( resp => {
      this.setState({ isAuth: false })
      props.history.push("/forgot-password/complete?success=true")
    })
    .catch( err => console.log(err))
  }

  resetPass = (user, token, e) => {
    e.preventDefault()

    AxiosHelper()
    axios.post('/api/v1/auth/password/reset', { password: user.password, token })
    .then( _resp => {
      this.setState({ isAuth: false })
      window.location.href = "/login"
    })
    .catch( err => console.log(err))
  }

  logout = (e) => {
    e.preventDefault()

    AxiosHelper()
    axios.delete('/api/v1/auth/logout')
    .then( _resp => {
      this.setState({ isAuth: false })
      window.location.href = '/'
    })
    .catch( err => console.log(err))
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          email: this.state.email,
          signup: this.signup,
          login: this.login,
          logout: this.logout,
          forgotPass: this.forgotPass,
          resetPass: this.resetPass
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
