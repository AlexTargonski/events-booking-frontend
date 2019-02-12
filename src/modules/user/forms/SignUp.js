import React, { Component } from 'react';
import styled               from 'styled-components';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form : {
        email    : '',
        password : '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleChange(e) {
   let form = Object.assign({}, this.state.form);
   form[e.target.name] = e.target.value;
   this.setState({ form });
  }

  submitHandler(e) {
    const { email, password } = this.state.form;
    e.preventDefault();

    let requestBody = {
      query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            email
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <FormWrapper onSubmit={this.submitHandler}>
        <h1>Sign up</h1>
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
        <FormButton type="submit">
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
  && {
    background : #36c2b9;
    color      : #ffff;
    border     : none;
    width      : 245px;
    height     : 60px;
    margin     : 1% auto;
    cursor     : pointer;
    font-size  : 18px;
   }

   &:hover {
     background : #4bb8b1;
   }
`;

export default LoginPage;
