import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Root from './containers/Root';
import Home from './containers/Home';
import Login from './containers/Login';

export default (
  <Router history = {browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Home} />
      <Route path="/login" component={Login} />
    </Route>
  </Router>
)