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
import SignUpPage            from './modules/user/pages/SignUpPage';
import NavBar                from './modules/layouts/NavBar';
import EventsPage            from './modules/events/pages/EventsPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <GlobalStyle />
          <Switch>
            <Redirect from="/" to="/home" exact />
            <Route path="/home"     component={HomePage} />
            <Route path="/login"    component={LoginPage} />
            <Route path="/sign_up"  component={SignUpPage} />
            <Route path="/events"   component={EventsPage} />
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
