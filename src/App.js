import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
}                            from 'react-router-dom';

import LoginPage             from './modules/user/pages/LoginPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/login" exact />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
