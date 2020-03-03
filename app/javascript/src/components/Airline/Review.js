import React from 'react'
import styled from 'styled-components'
import Rating from '../Rating/Rating'

const Card = styled.div`
  border-radius: 4px;
  border: 1px solid #E6E6E6;
  padding: 20px;
  margin: 0px 0px 20px 0px;
  position: relative;
`

const Title = styled.div`
  padding: 20px 0px;
  font-weight: bold;
`

const Description = styled.div`
  padding: 0 0 20px 0;
`
const Options = styled.div`
position:absolute;
right :15px;
top: 15px;
display: flex;
flex-direction: columns;
`

const Icon = styled.button`
  box-shadow: none;
  border-radius: 4px;
  margin: 0 4px;

  i {
    font-size: 18px;
  }
`

const Review = (props) => {
  const attributes = props.attributes

  return (
    <Card>
      <Title>
        {attributes.title}
      </Title>
      <Description>
        {attributes.description}
      </Description>
      <Rating score={attributes.score}/>
      <Options>
        <Icon onClick={props.handleDestroy.bind(this, props.id)}> <i className="fa fa-trash"></i></Icon>
        <Icon> <i className="fa fa-pencil"></i></Icon>
      </Options>
    </Card>
  )
}

export default Review