import React, { useState, useEffect } from 'react'
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
  padding: 20px;

  > div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`

const Airlines = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/airlines.json')
    .then( resp => {
      let result = resp.data.data.map( (airline, index) => { 
        return (
          <Airline 
            key={index} 
            name={airline.attributes.name} 
            image_url={airline.attributes.image_url} 
            slug={airline.attributes.slug}
            avg_score={airline.attributes.avg_score}
          />
        )
      })

      return setAirlines(result)
    })
    .catch( data => console.log('error', data))

  }, [airlines.length])

  return (
    <Home>
      <Header>
        <h1>OpenFlights</h1>
        <Subheader>Honest, unbiased airline reviews. Share your experience.</Subheader>
      </Header>
      <Grid>{airlines}</Grid>
    </Home>
  )
}

export default Airlines