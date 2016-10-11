"use strict";
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { Link, browserHistory } from 'react-router';
import { AppBar, IconButton, IconMenu, MenuItem, Paper } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

injectTapEventPlugin();

class RootContainer extends Component {

  render(){

    const styles = {
      padding: '0 15px',
      height: '100%'
    };
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Title"
              onLeftIconButtonTouchTap = {this._handleClick}
              iconElementRight={this._logMenu()}
            />
            <div className="container"><Paper style={styles} children={this.props.children} /></div>
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }

  _logMenu = (props) => {
    return (
      <IconMenu
       {...props}
       iconButtonElement = {<IconButton><MoreVertIcon /></IconButton>}
      >
        <MenuItem primaryText="Go next" containerElement={<Link to="/news"/>} />
        <MenuItem primaryText="Sign in" containerElement={<Link to="/login"/>}  />
      </IconMenu>
    );
  };

  _handleClick = e => {
    e.preventDefault();
    browserHistory.push('/');
  }
}
// const LogMenu = (props) => (
//
// );
export default RootContainer;