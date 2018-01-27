import React, { Fragment } from 'react';
import { object, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import UserIcon from 'material-ui/svg-icons/social/person';
import UserIconOut from 'material-ui/svg-icons/social/person-outline';

const AuthMenu = props => {
  const { user, onTouchHandler } = props;
  const isAuth = user && user.isAuthenticated;
  return (
    <Fragment>
      {isAuth && <span className="hello-message">Hello { user.data.name }</span>}
      <IconMenu
        iconButtonElement = {
          <IconButton>
            {isAuth ? <UserIcon color="#fff" /> : <UserIconOut color="#fff" />}
          </IconButton>
        }
      >
        {isAuth ? (
          <Fragment>
            <MenuItem primaryText="Go Dashboard" containerElement={<Link to="/dashboard" />} />
            <MenuItem primaryText="Logout" onTouchTap={onTouchHandler} />
          </Fragment>
        ) : <MenuItem primaryText="Sign in" containerElement={<Link to="/login" />} />}
      </IconMenu>
    </Fragment>
  );
};

AuthMenu.propTypes = {
  user: object,
  onTouchHandler: func
};

export default AuthMenu;