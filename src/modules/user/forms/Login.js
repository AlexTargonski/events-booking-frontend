import React, { Component } from 'react';
import styled               from 'styled-components';

import AuthContext          from '../../../context/auth-context';
import Button               from '../../layouts/Button';

class LoginPage extends Component {
  state = {
    form : {
      email    : '',
      password : '',
    },
  };

  static contextType = AuthContext;

  handleChange = (e) => {
   let form = Object.assign({}, this.state.form);
   form[e.target.name] = e.target.value;
   this.setState({ form });
  }

  submitHandler = (e) => {
    const { email, password } = this.state.form;
    e.preventDefault();

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    fetch('http://localhost:8080/graphiql', {
      method  : 'POST',
      body    : JSON.stringify(requestBody),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <FormWrapper onSubmit={this.submitHandler}>
        <h1>Login</h1>
        <FormInput
          placeholder='Email'
          name="email"
          type="email"
          onChange={this.handleChange}
        />
        <FormInput
          placeholder='Password'
          name="password"
          type="password"
          onChange={this.handleChange}
        />
        <Button type="submit">
          Login
        </Button>
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

export default LoginPage;
