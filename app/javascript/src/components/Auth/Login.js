import React, { Component }  from 'react'
import axios from 'axios'
import Authenticate from '../../utils/Auth/Authenticate'
import Loader from '../Loader'

class Login extends Component {
  constructor(props){
    super(props)   
    this.state = { email: '', password: '', auth: false, loading: true }
  }

  componentDidMount(){
    Authenticate()
    .then( (resp) => {
      if (resp) {
      // If auth is true, user is already logged in. Get 'em outta here!
        this.props.history.goBack()
      } else {
        // Update our state with auth and let our render method know we're ready for 'em
        this.setState({ auth: resp, loading: false })
      }
    })
    .catch( err => console.log(err))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/api/v1/auth', { user: { ...this.state } }, { withCredentials: true })
    .then( resp => props.history.push("/"))
    .catch( err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value })
  }

  render(){
    return (
      <div>
        { 
          this.state.loading ?
          <Loader/> :
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} type="email" value={this.state.email} name="email"/>
            <input onChange={this.handleChange} type="password"value={this.state.password} name="password"/>
            <button type="submit">Login</button>
          </form>   
        }
      </div>
    )
  }
}

export default Login