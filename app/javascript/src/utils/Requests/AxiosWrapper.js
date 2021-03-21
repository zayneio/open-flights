import axios from 'axios'

const token = document.querySelector('[name="csrf-token"]') || {content: 'no-csrf-token'}
const AxiosWrapper = axios.create({
  headers: {
    common: {
      'X-CSRF-Token': token.content
    }
  }
})

export default AxiosWrapper
