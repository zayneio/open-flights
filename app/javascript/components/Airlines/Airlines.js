import React, { Component } from 'react'
import axios from 'axios'
import Airline from './Airline'
import styled from 'styled-components'

const Home = styled.div`
  text-align:center;
`

const Header = styled.div`
  padding:100px 100px 10px 100px;
  
  h1 {
    font-size:42px;
  }
`

const Subheader = styled.p`
  font-weight:300;
  font-size:26px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding:20px;

  > div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`

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
      <Home>
        <Header>
          <h1>OpenFlights</h1>
          <Subheader>Honest, unbiased airline reviews. Share your experience.</Subheader>
        </Header>
        <Grid>
         {airlines}
        </Grid>
      </Home>
    )
  }
}

export default Airlines