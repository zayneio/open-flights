import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Airline from './Airline'
import Header from './Header'
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
    axios.get('/api/v1/airlines.json')
    .then( resp => setAirlines(resp.data.data))
    .catch( data => console.log('error', data))

  }, [airlines.length])

  const airlineGrid = airlines.map( (a, i) => { 
    return (
      <Airline 
        key={i} 
        name={a.attributes.name} 
        image_url={a.attributes.image_url} 
        slug={a.attributes.slug}
        average_score={a.attributes.average_score}
      />
    )
  })

  return (
    <Home>
      <Header/>
      <Grid>{airlineGrid}</Grid>
    </Home>
  )
}

export default Airlines