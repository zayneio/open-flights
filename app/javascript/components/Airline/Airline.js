import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Review from './Review'
import Rating from '../Rating/Rating'

const Column = styled.div`
  background: #fff; 
  max-width: 50%;
  width: 50%;
  float: left; 
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll; 
  overflow: scroll;
`

const Header = styled.div`
  padding:100px 100px 10px 100px;
  font-size:30px;
  text-align:center;
`

class Airline extends Component {
  state = {
    airline: null,
    review: null,
    reviews: []
  }

  componentDidMount(){
    const slug = this.props.match.params.slug
    const url = '/api/v1/airlines/' + slug

    axios.get(url)
    .then( resp => {
      this.setState({
        airline: resp.data,
        reviews: resp.data.included
      })
    })
    .catch( data => {
      debugger
    })
  }

  render(){
    const name = this.state.airline ? this.state.airline.data.attributes.name : ''
    const image_url = this.state.airline ? this.state.airline.data.attributes.image_url : ''
    const average = this.state.airline ? this.state.airline.data.attributes.avg_score : 0

    let reviews
    if (this.state.reviews.length > 0) {
      reviews = this.state.reviews.map( (review, index) => {
        return (
          <Review 
            key={index} 
            title={review.attributes.title} 
            description={review.attributes.description} 
            score={review.attributes.score}
          />
        )
      })
    }

    return(
      <div>
        <Column>
          <Header>
            <img src={image_url} alt={name} width="50"/>
            <h1>{name}</h1>
            <Rating score={average}/>
          </Header>
          <div className="reviews">
            {reviews}
          </div>
        </Column>
        <Column>
          [review form will go here.]
        </Column>
      </div>
    )
  }
}

export default Airline
