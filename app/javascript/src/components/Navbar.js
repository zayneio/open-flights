import React from 'react'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
import FakeParent from './FakeParent'

const Wrapper = styled.nav`
  width: 100%;
  height: 65px;
  line-height: 65px;
  background-color: black;
  color: white;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
`

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Left = styled.div`
  flex-basis: auto;
  align-self: flex-start !important;
`

const Right = styled.div`
  flex-basis: 12%;
  align-self: flex-end !important;
  margin-right: 24px;

  a {
    color: #fff;
    text-decoration: none;
    cursor: pointer
  }
`

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding:0;
  margin:0;
  list-style-type: none;
`

const Logo = styled.span`
  font-family: 'Poppins-ExtraBold';
  font-weight: bold;
  font-size: 20px;

  a {
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    color: #fff;
    text-decoration: none;
  }
`

const Navbar = (props) => {
  return (
    <Wrapper>
      <Container>
        <Nav>
          <Left>
            <Logo><Link to="/">OpenFlights</Link></Logo>
          </Left>
          <Right>
            <Menu>
              {
                props.auth ? 
                <FakeParent>
                  <li><Link to="/">Home</Link></li>
                  <li><a onClick={props.handleLogOut}>Log Out</a></li>
                </FakeParent> :
                <FakeParent>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Signup</Link></li>
                </FakeParent>
              }
            </Menu>
          </Right>
        </Nav>  
      </Container>
    </Wrapper>
  )
}

export default Navbar
