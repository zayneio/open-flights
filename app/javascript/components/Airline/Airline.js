import React, { Component } from 'react'

class Airline extends Component {
  state = {
    airline: null,
    review: null,
    reviews: []
  }

  render(){
    return(
      <div>This is the Airlines#show page.</div>
    )
  }
}

export default Airline