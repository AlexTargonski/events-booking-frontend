import React, { Component } from 'react';
import styled               from 'styled-components';

class LoginPage extends Component {
  render() {
    return (
      <FormWrapper>
        <h1>Sign up</h1>
        <FormInput
          placeholder='Email'
          name="email"
          type="email"
        />
        <FormInput
          placeholder='Password'
          name="password"
          type="password"
        />
        <FormButton>
          Sign up
        </FormButton>
      </FormWrapper>
    );
  }
}

const FormWrapper = styled.form`
  padding        : 10%;
  display        : flex;
  flex-direction : column;
`;

const FormInput = styled.input`
  margin  : 2% 0 !important;
  border  : 1px solid #36c2b9;
  padding : 16px;
`;

const FormButton = styled.button`
  &&& {
    background : #36c2b9;
    color      : #ffff;
    border     : none;
    padding    : 10px;
    padding    : 20px;
    margin     : 1% 30%;
    cursor     : pointer;
    font-size  : 20px;
   }
`;

export default LoginPage;
