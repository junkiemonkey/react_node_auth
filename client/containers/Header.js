import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { AppBar, IconButton, IconMenu, MenuItem, Paper } from 'material-ui';
import { connect } from 'react-redux';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import UserIcon from 'material-ui/svg-icons/social/person';
import UserIconOut from 'material-ui/svg-icons/social/person-outline';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import {logout} from '../AC/auth.AC';

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
          iconElementRight={this.logMenu()}
          iconElementLeft={this.siteMenu()}
        ></AppBar>
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

  logMenu = (props) => {
    const {user} = this.props;
    const hasUser = user && user.isAuthenticated;
    return (
      <div>
        {hasUser ? <span className="hello-message">Hello {user.data.name}</span> : ''}
        <IconMenu
          {...props}
          iconButtonElement = {hasUser ? <IconButton><UserIcon color="#fff" /></IconButton> : <IconButton><UserIconOut color="#fff" /></IconButton>}
        >
          {hasUser ? <MenuItem primaryText="Go Dashboard" containerElement={<Link to="/dashboard"/>} /> : null}
          {hasUser ? <MenuItem primaryText="Logout" onTouchTap={this._handleLogOut}  /> :  <MenuItem primaryText="Sign in" containerElement={<Link to="/login"/>}  />}
        </IconMenu>
      </div>
    );
  };

  _handleLogOut = e => {
    // e.preventDefault();
    const {router} = this.context;
    this.props.logout();
    router.push('/');
  }
}

export default connect(({auth}) => {
  return auth;
}, {logout})(Header);