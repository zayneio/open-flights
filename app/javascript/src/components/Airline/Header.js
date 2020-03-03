import React from 'react'
import styled from 'styled-components'
import Rating from '../Rating/Rating'

const Wrapper = styled.div`
  padding: 50px 100px 50px 0px;
  font-size:30px;
  img {
    padding-right: 10px;
  }
`

const UserReviewCount = styled.div`
  font-size: 18px;
  padding:10px 0;
`

const ScoreOutOf = styled.div`
  padding-top: 12px;
  font-size: 18px;
  font-weight: bold;
`

const Header = (props) => {
  const { image_url, name, reviews, average } = props
  const reviewCount = reviews ? reviews.length : 0

  return (
    <Wrapper>
      <h1><img src={image_url} height="50" width="50" alt={name} /> {name}</h1>
      <div>
        <UserReviewCount><span className="review-count">{reviewCount}</span> user reviews</UserReviewCount>
        <Rating score={average} />
        <ScoreOutOf>{average.toFixed(1)} out of 5 stars</ScoreOutOf>       
      </div>
    </Wrapper> 
  )
}

export default Header