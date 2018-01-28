import 'babel-polyfill';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import App from './pages';
import './app.scss';

const { env: { NODE_ENV } } = process;

const RenderType = NODE_ENV === 'production' ? hydrate : render;



RenderType(
  <Provider store={store}>
    <MuiThemeProvider>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);