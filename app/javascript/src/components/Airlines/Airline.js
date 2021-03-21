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

  img {
    height: 50px;
    width: 50px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 100%;
  }
`

const AirlineName = styled.div`
  padding: 20px 0 10px 0;
`

const LinkWrapper = styled.div`
  margin: 30px 0 20px 0;
  height:50px;

  a {
    color: #fff;
    background-color: #71b406;
    border-radius: 4px;
    padding: 10px 50px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #71b406;
    text-align: center;
    line-height: 20px;
    min-height: 40px;
    margin: 7px;
    font-weight: 600;
    text-decoration: none;
    width: 100%;
    transition: ease-in-out 0.1s;

    &:hover{
      border-color: #619a07;
      background: #619a07;
    }
  }
`

const Airline = ({ name, image_url, average_score, slug, ...props }) => {
  return (
    <Card>
      <AirlineLogo>
        <img src={image_url} alt={name} width="50"/>
      </AirlineLogo>
      <AirlineName>
        {name}
      </AirlineName>
      <Rating score={average_score} />
      <LinkWrapper>
        <Link to={"/airlines/" + slug}>View Airline</Link>
      </LinkWrapper>
    </Card>
  )
}

export default Airline
