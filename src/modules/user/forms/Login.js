import React, { Component } from 'react';
import styled               from 'styled-components';

class LoginPage extends Component {
  render() {
    return (
      <FormWrapper>
        <FormInput placeholder='Email' />
        <FormInput placeholder='Password' />
        <input type="text" />
        <FormButton>
          Click Here
        </FormButton>
      </FormWrapper>
    );
  }
}

const FormWrapper = styled.form`
  padding : 10%;
`;

const FormInput = styled.input`
  margin : 5% 0 !important;
`;

const FormButton = styled.button`
  &&& {
    background : #36c2b9;
    color      : #ffff;
    border     : none;
    padding    : 10px;
    margin-top : 10px;
   }
`;

export default LoginPage;
