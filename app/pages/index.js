import React, { Component, Fragment } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

/**
 * Components
 */
import HomePage from './Home';
import Dashboard from './Dashboard';
import News from './News';
import Login from './Auth/Login';
import Reg from './Auth/Reg';
import Header from '../components/Header';

/**
 * Misc
 */
import { Routes } from '../settings';

@withRouter
@connect(state => state, {})
export default class App extends Component {
  static propTypes = {
  }

  render() {

    const styles = {
      padding: '0 15px',
      height: '100%'
    };

    return (
      <Fragment>
        <Header />
        <div className="container">
          <Paper zDepth={0} style={styles} >
            <Switch>
              <Route path={Routes.home} exact component={HomePage} />
              <Route path={Routes.login} component={Login} />
              {/*<Route path={Routes.registration} component={Reg} />*/}
              {/*<Route path={Routes.dashboard.main} exact component={Dashboard} />*/}
              {/*<Route path={Routes.dashboard.new} />*/}
            </Switch>
          </Paper>
        </div>
      </Fragment>
    );
  }
}
