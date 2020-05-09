import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AxiosHelper from '../../utils/Requests/AxiosHelper'
import styled from 'styled-components'
import Review from './Review'
import ReviewForm from './ReviewForm'
import Header from './Header'
import airlineQuery from '../../queries/airlineQuery'
import createReviewQuery from '../../queries/createReviewQuery'
import GetNested from '../../utils/Helpers/GetNested'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`

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

  &:last-child {
    background: black;
    border-top: 1px solid rgba(255,255,255,0.5);
  }
`

const Main = styled.div`
  padding-left: 60px;
`

const Airline = (props) => {
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})
  const [error, setError] = useState('')

  useEffect(()=> {
    const slug = props.match.params.slug
    // This uses the v2 api (graphql) as of 05/09/2020.
    // For the v1 api endpoint use: axios.get('/api/v1/airlines/:slug')
    axios.post('/api/v2/graphql', { query: airlineQuery(slug) })
    .then( (resp) => setAirline(resp.data.data.airline))
    .catch( data => console.log('Error', data) )
  }, [])

  // Modify text in review form
  const handleChange = (e) => {
    e.preventDefault()

    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
  }

  // Create a review
  const handleSubmit = (e) => {
    e.preventDefault()

    AxiosHelper()

    const airlineId = parseInt(airline.id)
    // This uses the v2 api (graphql) as of 05/09/2020.
    // For the v1 api endpoint use: axios.post('/api/v1/reviews')
    axios.post('/api/v2/graphql', 
      { query: createReviewQuery({ ...review, airlineId }) }
    )
    .then( (resp) => {
      const payload = resp.data.data.createReview
      if (payload.error || payload.message == 'failure') {
        setError(payload.error)
      } else {
        const reviews = [ ...airline.reviews, payload ]
        setAirline({ ...airline, reviews })
        setReview({ title: '', description: '', score: 0 })
        setError('')
      }
    })
    .catch( resp => {
      let error
      switch(resp.message){
        case "Request failed with status code 401":
          error = 'Please log in to leave a review.'
          break
        default:
          error = 'Something went wrong.'
      }
      setError(error)
    })
  }

  // Destroy a review
  const handleDestroy = (id, e) => {
    e.preventDefault()

    axios.delete(`/api/v1/reviews/${id}`)
    .then( (data) => {
      let reviews = [...airline.reviews]
      const index = reviews.findIndex( (data) => data.id == id )
      reviews.splice(index, 1)

      setAirline({ ...airline, reviews })
    })
    .catch( data => console.log('Error', data) )
  }

  // set score
  const setRating = (score, e) => {
    e.preventDefault()  
    setReview({ ...review, score })
  }

  const name = GetNested(airline, 'name')
  const image_url = GetNested(airline, 'imageUrl')
  
  let total, average = 0
  let airlineReviews

  if (airline.reviews && airline.reviews.length > 0) {
    total = airline.reviews.reduce((total, review) => total + review.score, 0)
    average = total > 0 ? (parseFloat(total) / parseFloat(airline.reviews.length)) : 0
    
    airlineReviews = airline.reviews.map( (review, index) => {
      return (
        <Review 
          key={index}
          id={review.id}
          attributes={review}
          handleDestroy={handleDestroy}
        />
      )
    })
  }

  return(
    <Wrapper>
      <Column>
        <Main>
          <Header 
            image_url={image_url}
            name={name}
            reviews={airline.reviews}
            average={average}
          />
          {airlineReviews}
        </Main>
      </Column>
      <Column>
        <ReviewForm
          name={name}
          review={review}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setRating={setRating}
          error={error}
        />
      </Column>
    </Wrapper>
  )
}

export default Airline
