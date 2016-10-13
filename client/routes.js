import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Root from './containers/Root';
import Home from './containers/Home';
import Login from './containers/Login';
import Reg from './containers/Reg';
import Dashboard from './containers/Dashboard';

export default (
  <Router history = {browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Reg} />
      <Route path="/dashboard" component={Dashboard} />
    </Route>
  </Router>
)