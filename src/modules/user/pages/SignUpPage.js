import React, { Component } from 'react';
import styled               from 'styled-components';

import SignUp               from '../forms/SignUp';

class SignUpPage extends Component {
  render() {
    return (
      <PageWrapper>
        <SignUp />
      </PageWrapper>
    )
  }
}

const PageWrapper = styled.div`
  display        : flex;
  flex-direction : column;
  padding        : 5%;
`;

export default SignUpPage;
