import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Review from './Review'
import ReviewForm from './ReviewForm'
import Header from './Header'

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

const Airline = (props) => {
  const [airline, setAirline] = useState({ data: {  attributes: { name: '', image_url: '', average: 0 } } })
  const [reviews, setReviews] = useState([])
  const [review, setReview] = useState({title: '', description: '', score: 0 })

  useEffect(()=> {
    const slug = props.match.params.slug
    const url = `/api/v1/airlines/${slug}`

    axios.get(url)
    .then( (resp) => {
      setAirline(resp.data)
      setReviews(resp.data.included)
    })
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

    const airline_id = parseInt(airline.data.id)

    axios.post('/api/v1/reviews', { ...review, airline_id })
    .then( (resp) => {
      setReviews([...reviews, resp.data.data])
      setReview({ title: '', description: '', score: 0 })
    })
    .catch( data => console.log('Error', data) )
  }
  
  // Destroy a review
  const handleDestroy = (id, e) => {
    e.preventDefault()

    axios.delete(`/api/v1/reviews/${id}`)
    .then( (data) => {
      const updatedReviews = [...reviews]
      const index = updatedReviews.findIndex( (data) => data.id == id )
      updatedReviews.splice(index, 1)

      setReviews(updatedReviews)
    })
    .catch( data => console.log('Error', data) )
  }

  // set score
  const setRating = (score, e) => {
    e.preventDefault()  
    setReview({ ...review, score })
  }

  const { name, image_url } = airline.data.attributes
  const total = reviews.length > 0 ? reviews.reduce((total, review) => total + review.attributes.score, 0) : 0
  const average = total > 0 ? (parseFloat(total) / parseFloat(reviews.length)) : 0

  const allReviews = reviews.map( (review, index) => {
    return (
      <Review 
        key={index}
        id={review.id}
        title={review.attributes.title} 
        description={review.attributes.description} 
        score={review.attributes.score}
        handleDestroy={handleDestroy}
      />
    )
  })

  return(
    <div>
      <Column>
        <Header 
          image_url={image_url}
          name={name}
          reviews={reviews}
          average={average}
        />
        {allReviews}
      </Column>
      <Column>
        <ReviewForm
          name={name}
          review={review}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setRating={setRating}
        />
      </Column>
    </div>
  )
}

export default Airline
