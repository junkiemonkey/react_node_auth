import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { AppBar, IconButton, IconMenu, MenuItem, Paper } from 'material-ui';
import { connect } from 'react-redux';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import {logout} from '../AC/auth';

class Header extends Component {
  static propTypes = {

  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  render(){

    return(
      <div>
        <AppBar
          title="Super Mega Site on ReactJS and NodeJS!"
          //onLeftIconButtonTouchTap = {this._handleClick}
          iconElementRight={this._logMenu()}
          iconElementLeft={this.siteMenu()}
        />
      </div>
    )
  }

  siteMenu = (props) => {
    return (
      <IconMenu {...props} iconButtonElement={<IconButton><MenuIcon color="#fff" /></IconButton>}>
        <MenuItem primaryText="Home" containerElement={<Link to="/"/>}/>
        <MenuItem primaryText="News" containerElement={<Link to="/news"/>}/>
      </IconMenu>
    );

  };

  _logMenu = (props) => {
    const auth = store.getState().auth;
    const hasUser = auth.hasOwnProperty('user') && auth.user.isAuthenticated;
    return (
      <IconMenu
        {...props}
        iconButtonElement = {<IconButton><MoreVertIcon /></IconButton>}
      >
        {hasUser ? <MenuItem primaryText="Go Dashboard" containerElement={<Link to="/dashboard"/>} /> : null}
        {hasUser ? <MenuItem primaryText="Logout" onTouchTap={this._handleLogOut}  /> :  <MenuItem primaryText="Sign in" containerElement={<Link to="/login"/>}  />}
      </IconMenu>
    );
  };

  _handleClick = e => {
    e.preventDefault();
    browserHistory.push('/');
  }
  _handleLogOut = e => {
    // e.preventDefault();
    const {router} = this.context;
    this.props.logout();
    router.push('/');
  }
}

export default connect(state => {
  return state;
}, {logout})(Header);