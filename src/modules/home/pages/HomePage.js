import React, { Component } from 'react';
import styled               from 'styled-components';

import bg                   from '../canvas.png';
import About                from '../components/About';
import Login                from '../../user/forms/Login';

class HomePage extends Component {
  render() {
    return (
      <HomeWrapper>
        <About />
        <Login />
      </HomeWrapper>
    )
  }
}

const HomeWrapper = styled.div`
  background-image  : url(${bg});
  height            : 100vh;
  background-repeat : no-repeat;
  background-size   : cover;
  display           : flex;
  flex-direction    : row;
  color             : #222534;
`;

export default HomePage;
