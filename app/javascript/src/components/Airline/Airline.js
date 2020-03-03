import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Review from './Review'
import Rating from '../Rating/Rating'
import ReviewForm from './ReviewForm'

const Column = styled.div`
  background: #fff; 
  max-width: 50%;
  width: 50%;
  float: left; 
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll; 
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
const Header = styled.div`
  padding: 50px 100px 50px 0px;
  font-size:30px;
  img {
    padding-right: 10px;
  }
`

const JumboSubHeader = styled.div`
  font-weight: 300;
  font-size: 26px;
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

const AirlineRating = styled.div``

const RatingContainer = styled.div``

class Airline extends Component {
  state = {
    airline: { 
      data: { 
        attributes: {
          name: '', 
          image_url: '', 
          average: 0
        } 
      } 
    },
    reviews: [],
    review: {
      title: '', 
      description: '', 
      score: 0
    }
  }

  componentDidMount(){
    this.setBaseData()
  }

  handleChange = (e) => {
    e.preventDefault()

    this.setState({
      review: Object.assign({}, this.state.review, {[e.target.name]: e.target.value})
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const airline_id = parseInt(this.state.airline.data.id)
    const review = { ...this.state.review, airline_id }

    axios.post('/api/v1/reviews', review)
    .then( (resp) => {
      this.setState({
        reviews: [...this.state.reviews, resp.data.data],
        review: { title: '', description: '', score: 0 }
      })
    })
    .catch( data => console.log('Error', data) )
  }

  handleDestroy = (id, e) => {
    e.preventDefault()

    axios.delete(`/api/v1/reviews/${id}`)
    .then( (data) => {
      const reviews = [...this.state.reviews]
      const index = reviews.findIndex( (data) => data.id == id )
      reviews.splice(index, 1)

      this.setState({reviews})
    })
    .catch( data => console.log('Error', data) )
  }

  setBaseData = () => {
    const slug = this.props.match.params.slug
    const url = `/api/v1/airlines/${slug}`

    axios.get(url)
    .then( (resp) => {
      this.setState({
        airline: resp.data,
        reviews: resp.data.included
      })
    })
    .catch( data => console.log('Error', data) )
  }

  setRating = (score, e) => {
    e.preventDefault()  

    let review = { ...this.state.review }
    review.score = parseInt(score)

    this.setState({review})
  }

  render(){
    let { name, image_url } = this.state.airline.data.attributes
    let total_score = this.state.reviews.reduce((total, review) => total + review.attributes.score, 0)
    let avg_score = total_score > 0 ? (parseFloat(total_score) / parseFloat(this.state.reviews.length)) : 0

    let reviews = this.state.reviews.map( (review, index) => {
      return (
        <Review 
          key={index}
          id={review.id}
          title={review.attributes.title} 
          description={review.attributes.description} 
          score={review.attributes.score}
          handleDestroy={this.handleDestroy}
        />
      )
    })

    return(
      <div>
        <Column>
          <Header>
            <h1>
              <img src={image_url} height="50" width="50" alt={name} /> 
              {name}
            </h1>
            <AirlineRating>
              <UserReviewCount><span className="review-count">{this.state.reviews.length}</span> user reviews</UserReviewCount>
              <Rating score={avg_score} />
              <ScoreOutOf>{avg_score.toFixed(1)} out of 5 stars</ScoreOutOf>       
            </AirlineRating>
          </Header>
          {reviews}
        </Column>
        <Column>
          <ReviewForm
            name={name}
            review={this.state.review}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            setRating={this.setRating}
          />
        </Column>
      </div>
    )
  }
}

export default Airline
