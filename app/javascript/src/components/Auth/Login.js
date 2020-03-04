import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import Authenticate from '../../utils/Auth/Authenticate'

const Login = (props) => {
  const [user, setUser] = useState({ email: '', password: '' })

  useEffect( () => {
    if (Authenticate()) props.history.push("/") 
  }, [] )

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/api/v1/auth', { user: { ...user } }, { withCredentials: true })
    .then( resp => props.history.push("/"))
    .catch( err => console.log(err))
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="email" value={user.email} name="email"/>
      <input onChange={handleChange} type="password"value={user.password} name="password"/>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login