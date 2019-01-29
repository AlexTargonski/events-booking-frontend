import React, { Component } from 'react';
import styled               from 'styled-components';

class LoginPage extends Component {
  render() {
    return (
      <FormWrapper>
        <FormInput placeholder='Email' />
        <FormInput placeholder='Password' />
        <FormButton>
          Login
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