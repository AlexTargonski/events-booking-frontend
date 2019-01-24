import React, { Component, Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
}                            from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import HomePage              from './modules/home/pages/HomePage';
import LoginPage             from './modules/user/pages/LoginPage';
import NavBar                from './modules/layouts/NavBar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <GlobalStyle />
          <Switch>
            <Redirect from="/" to="/home" exact />
            <Route path="/home"  component={HomePage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    padding     : 0;
    margin      : 0;
    font-family : 'Raleway', sans-serif;
  }
`

export default App;
