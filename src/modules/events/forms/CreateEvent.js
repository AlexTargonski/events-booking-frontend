import React, { Component } from 'react';
import styled               from 'styled-components';

class CreateEvent extends Component {
  state = {
    form : {
      title : '',
      desc  : '',
      price : '',
      date  : '',
    },
  };

  handleChange = (e) => {
   let form = Object.assign({}, this.state.form);
   form[e.target.name] = e.target.value;
   this.setState({ form });
  }

  render() {
    return (
      <FormWrapper onSubmit={this.submitHandler}>
        <h1>Login</h1>
        <FormInput
          placeholder='Title'
          name="title"
          type="text"
          onChange={this.handleChange}
        />
        <FormInput
          placeholder='Description'
          name="desc"
          type="text"
          onChange={this.handleChange}
        />
        <FormInput
          placeholder='Price'
          name="price"
          type="text"
          onChange={this.handleChange}
        />
        <FormInput
          placeholder='Date'
          name="date"
          type="date"
          onChange={this.handleChange}
        />
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

export default CreateEvent;
