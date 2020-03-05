import axios from 'axios'

const Authenticate = async () => {
  let loggedIn = false
  await axios.get('/api/v1/auth/logged_in', { withCredentials: true })
  .then( resp => {
    loggedIn = resp.data.logged_in
    return loggedIn
  })
  .catch( err => console.log(err) )

  return loggedIn
}

export default Authenticate
