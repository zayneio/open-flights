import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Airline = (props) => {
  return (
    <div className="card">
      <div className="airline-logo">
        <img src={props.image_url} alt={props.name} width="50" />
      </div>
      <div className="airline-name">
        {props.name}
      </div>
      <div className="link-wrapper">
        <Link to={"/" + props.slug}>View Airline</Link>
      </div>
    </div>
  )
}

export default Airline