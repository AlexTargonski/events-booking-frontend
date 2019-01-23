import React, { Component, Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
}                            from 'react-router-dom';

import LoginPage             from './modules/user/pages/LoginPage';
import NavBar                from './modules/layouts/NavBar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <Switch>
            <Redirect from="/" to="/login" exact />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
