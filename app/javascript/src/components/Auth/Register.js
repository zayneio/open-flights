import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import Authenticate from '../../utils/Auth/Authenticate'

const Register = (props) => {
  const [user, setUser] = useState({ email: '', password: '' })

  useEffect( () => {
    if (Authenticate()) props.history.push("/") 
  }, [] )

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/api/v1/registrations', { user: { ...user } }, { withCredentials: true })
    .then( resp => {
      props.history.push("/") 
    })
    .catch( err => console.log(err))
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="email" name="email"/>
      <input onChange={handleChange} type="password" name="password"/>
      <button type="submit">Login</button>
    </form>
  )
}

export default Register