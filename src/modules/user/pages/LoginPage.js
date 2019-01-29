import React, { Component } from 'react';
import styled               from 'styled-components';

import Login                from '../forms/Login';

class LoginPage extends Component {
  render() {
    return (
      <PageWrapper>
        <Login />
      </PageWrapper>
    )
  }
}

const PageWrapper = styled.div`
  display        : flex;
  flex-direction : column;
`;

export default LoginPage;
