import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Airline from './Airline'
import Header from './Header'
// import airlinesQuery from '../../queries/airlinesQuery'
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
    /* 
      For the v2 graphql api (experimental) you can use:
      axios.post('/api/v2/graphql', { query: airlinesQuery })

      You'll also need to uncomment this line above:
      import airlinesQuery from '../../queries/airlinesQuery'
    */
    axios.get('/api/v1/airlines.json')
    .then( resp => setAirlines(resp.data.data))
    .catch( data => console.log('error', data))
  }, [])

  const grid = airlines.map( (airline, index) => {
    const { name, image_url, slug, average_score } = airline.attributes

    return (
      <Airline 
        key={index}
        name={name}
        image_url={image_url}
        slug={slug}
        average_score={average_score}
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