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
import AuthContext           from './context/auth-context';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token  : null,
      userId : null,
    }
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <>
          <AuthContext.Provider
            value={{
              token  : this.state.token,
              userId : this.state.userId,
              login  : this.login,
              logout : this.logout
            }}
          >
            <NavBar />
            <GlobalStyle />
            <Switch>
              {this.state.token && <Redirect from="/login" to="/events" exact />}
              <Redirect from="/" to="/home" exact />
              <Route path="/home"     component={HomePage} />
              <Route path="/login"    component={LoginPage} />
              <Route path="/sign_up"  component={SignUpPage} />
              <Route path="/events"   component={EventsPage} />
            </Switch>
          </AuthContext.Provider>
        </>
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
