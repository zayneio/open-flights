import React, { Component } from 'react'
import axios from 'axios'
import Airline from './Airline'

class Airlines extends Component {
  state = {
    airlines: []
  }
  
  componentDidMount() {
    axios.get('/api/v1/airlines.json')
    .then( resp => {
      this.setState({ airlines: resp.data.data })
    })
    .catch( data => {
      debugger
    })
  }

  render() {
    const airlines = this.state.airlines.map( (airline, index) => {
       return (<li key={index} >airline.attributes.name</li>)
    })
    
    return (
      <div className="home">
        <div className="header">
          <h1>OpenFlights</h1>
          <p className="subheader">Honest, unbiased airline reviews. Share your experience.</p>
        </div>
        <div className="grid">
          <ul>
            {airlines}
          </ul>
        </div>
      </div>
    )
  }
}

export default Airlines