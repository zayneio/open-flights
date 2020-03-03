import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Rating from '../Rating/Rating'

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
`

const AirlineLogo = styled.div`
  height: 50px;
`

const AirlineName = styled.div`
  padding:20px;
`

const LinkWrapper = styled.div`
  margin: 20px 0;
  height:50px;

  a {
    color: #fff;
    background-color: #71b406;
    border-radius: 4px;
    padding: 10px 30px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #71b406;
    text-align: center;
    line-height: 20px;
    min-height: 40px;
    margin: 7px;
    font-weight: 600;
    text-decoration: none;
  }
`

const Airline = (props) => {
  return (
    <Card>
      <AirlineLogo>
        <img src={props.image_url} alt={props.name} width="50"/>
      </AirlineLogo>
      <AirlineName>
        {props.name}
      </AirlineName>
      <Rating score={props.avg_score} />
      <LinkWrapper>
        <Link to={"/" + props.slug}>View Airline</Link>
      </LinkWrapper>
    </Card>
  )
}

export default Airline 