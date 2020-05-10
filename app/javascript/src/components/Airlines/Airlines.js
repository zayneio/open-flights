import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Airline from './Airline'
import Header from './Header'
import airlinesQuery from '../../queries/airlinesQuery'
import styled from 'styled-components'

const Home = styled.div`
  text-align:center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
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
    // This uses the v2 api (graphql) as of 05/09/2020.
    // For the v1 api endpoint use: axios.get('/api/v1/airlines.json')
    axios.post('/api/v2/graphql', { query: airlinesQuery })
    .then( resp => setAirlines(resp.data.data.airlines))
    .catch( data => console.log('error', data))
  }, [])

  const grid = airlines.map( (airline, index) => {
    return (
      <Airline 
        key={index}
        name={airline.name}
        image_url={airline.imageUrl}
        slug={airline.slug}
        average_score={airline.averageScore}
      />
    )
  })

  return (
    <Home>
      <Header/>
      <Grid>{grid}</Grid>
    </Home>
  )
}

export default Airlines