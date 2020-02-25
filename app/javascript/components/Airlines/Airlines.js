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
      console.log('error', data)
    })
  }

  render() {
    let airlines
    if (this.state.airlines.length > 0) {
      airlines = this.state.airlines.map( (airline, index) => { 
        return (
          <Airline 
            key={index} 
            name={airline.attributes.name} 
            image_url={airline.attributes.image_url} 
            slug={airline.attributes.slug} 
          />
        )
      })
    }

    return (
      <div className="home">
        <div className="header">
          <h1>OpenFlights</h1>
          <p className="subheader">Honest, unbiased airline reviews. Share your experience.</p>
        </div>
        <div className="grid">
         {airlines}
        </div>
      </div>
    )
  }
}

export default Airlines