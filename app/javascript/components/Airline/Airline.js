import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

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

class Airline extends Component {
  state = {
    airline: {
      name: '', 
      image_url: ''
    },
    review: null,
    reviews: []
  }

  componentDidMount(){
    const slug = this.props.match.params.slug
    const url = '/api/v1/airlines/' + slug

    axios.get(url)
    .then( (resp) => {
      this.setState({
        airline: resp.data.data.attributes,
        reviews: resp.data.included
      })
    })
    .catch( data => {
      console.log('error', data)
    })
  }

  render(){
    const { name, image_url } = this.state.airline
  
    return(
      <div>
        <Column>
          <div className="header">
            <img src={image_url} alt={name} width="50"/>
            <h1>{name}</h1>
          </div>

          <div className="reviews">
            [reviews will go here]
          </div>

        </Column>
        <Column>
          [new review form will go here]
        </Column>
      </div>
    )
  }
}

export default Airline