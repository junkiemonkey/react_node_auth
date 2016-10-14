"use strict";
import { checkAuth } from '../AC/auth';
import {connect} from 'react-redux';
import store from '../store';

const checkAuthenticate = (nextState, replace) => {
  store.dispatch(checkAuth());
  const {auth} = store.getState();
  if(!auth.isAuthenticated) replace('/login');
}

export default checkAuthenticate;