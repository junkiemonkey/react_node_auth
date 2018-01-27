import React, { Component } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { AppBar } from 'material-ui';

/**
 * Components
 */
import AuthMenu from './authMenu';
import SiteMenu from './siteMenu';

@connect(({ auth }) => auth, {})
export default class Header extends Component {
  static propTypes = {
    user: object
  }

  logOut = () => {}

  render() {

    const {
      props: { user },
      logOut
    } = this;

    return (
      <AppBar
        title="ReactJS + NodeJS SSR Example"
        iconElementRight={<AuthMenu user={user} onTouchHandler={logOut} />}
        iconElementLeft={<SiteMenu />}
      />
    );
  }
}

