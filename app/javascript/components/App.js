import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render(){
    return(
      <Switch>
        <Route exact path="/" component="Airlines" />
        <Route exact path="/:slug" component="Airline" />
      </Switch>
    )
  }
}

export default App