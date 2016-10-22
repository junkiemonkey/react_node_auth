"use strict";
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Paper } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './Header';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

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
            <Header />
            <div className="container"><Paper zDepth={0} style={styles} children={this.props.children} /></div>
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default RootContainer;