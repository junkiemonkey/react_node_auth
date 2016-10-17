import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Root from './containers/Root';
import Home from './containers/Home';
import Login from './containers/Login';
import Reg from './containers/Reg';
import Dashboard from './containers/Dashboard.container';
import checkAuth from './utils/checkAuth';
import News from './containers/News.container';
import EditNews from './containers/EditNews.container';

export default (
  <Router history = {browserHistory}>
    <Route path="/" component={Root} onEnter={checkAuth}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="registration" component={Reg} />
      <Route path="dashboard" component={Dashboard}>
        <Route path="new" component={EditNews}></Route>
      </Route>
      <Route path="news" component={News} />
    </Route>
  </Router>
)