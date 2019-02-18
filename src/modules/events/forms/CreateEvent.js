import React, { Component } from 'react';
import styled               from 'styled-components';

import AuthContext          from '../../../context/auth-context';

class CreateEvent extends Component {
  state = {
    form : {
      title : '',
      desc  : '',
      price : '',
      date  : '',
    },
  };

  static contextType = AuthContext;

  handleChange = (e) => {
   let form = Object.assign({}, this.state.form);
   form[e.target.name] = e.target.value;
   this.setState({ form });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, price, date, desc } = this.state.form;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      desc.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {title: "${title}", desc: "${desc}", price: ${price}, date: "${date}"}) {
              _id
              title
              desc
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };

    const token = this.context.token;

    fetch('http://localhost:8080/graphiql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          console.log(res)
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData)
      })
      .catch(err => {
        console.log(err);
      });
  };


  render() {
    return (
      <FormWrapper onSubmit={this.handleSubmit}>
        <h1>Create Event</h1>
        <FormInput
          placeholder='Title'
          name="title"
          type="text"
          onChange={this.handleChange}
        />
        <TextArea
          placeholder='Description'
          name="desc"
          type="text"
          onChange={this.handleChange}
        />
        <FormInput
          placeholder='Price'
          name="price"
          type="number"
          onChange={this.handleChange}
        />
        <FormInput
          placeholder='Date'
          name="date"
          type="date"
          onChange={this.handleChange}
        />
        <button type="submit">
          create
        </button>
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

const TextArea = styled.textarea`
  margin  : 2% 0 !important;
  border  : 1px solid #36c2b9;
  padding : 16px;
`;

export default CreateEvent;
