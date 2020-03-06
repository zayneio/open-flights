import React, { Component, useState, useEffect }  from 'react'
import axios from 'axios'
import AxiosHelper from '../../utils/Requests/AxiosHelper'
import Authenticate from '../../utils/Auth/Authenticate'
import { AuthConsumer } from '../AuthContext'
import Loader from '../Loader'
import styled from 'styled-components'

const LoginWrapper = styled.div``
const FormWrapper = styled.div`
  margin-top:50px;
`
const FormContainer = styled.div`
  width: 500px;
  margin: 0 auto;
`

const Form = styled.form`
  padding: 20px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #d8dee2;
  border-radius: 0 0 3px 3px;
`

const Input = styled.input`
  margin-top: 5px;
  margin-bottom: 15px;
  display: block;
  width: 100%;
  min-height: 34px;
  padding: 6px 8px;
  font-size: 16px;
  line-height: 20px;
  color: #24292e;
  vertical-align: middle;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
  width: 100%;
  box-sizing: border-box; /* add this */
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
`
const LoginButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  vertical-align: middle;
  background-position: -1px -1px;
  background-size: 110% 110%;
  border: 1px solid rgba(27,31,35,0.2);
  border-radius: 0.25em;
  width: 100%;
  box-sizing: border-box; /* add this */
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
`
const Field = styled.div`
  width: 100%;
`

const Register = (props) => {
  const [user, setUser] = useState({ email: '', password: ''})

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  return (
    <AuthConsumer>
      { ({ isAuth, signup }) => (
        <LoginWrapper>
          <FormWrapper>
            <FormContainer>
              <Form onSubmit={signup.bind(this, user, props)}>
                <h1>Sign Up</h1>
                <Field>
                  <label>Email</label>
                  <Input onChange={handleChange} type="email" value={user.email} placeholder="email" name="email"/>
                </Field>
                <Field>
                  <label>Password</label>
                  <Input onChange={handleChange} type="password"value={user.password} placeholder="password" name="password"/>
                </Field>
                <LoginButton type="submit">Login</LoginButton>
              </Form>   
            </FormContainer>
          </FormWrapper>
        </LoginWrapper>
      )}
    </AuthConsumer>
  )
}

export default Register