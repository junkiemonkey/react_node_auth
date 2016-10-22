"use strict";
import { checkAuth } from '../AC/auth.AC';
import {connect} from 'react-redux';
import store from '../store';

const checkAuthenticate = (nextState, replace) => {

  if(!store.getState().auth.hasOwnProperty('user')) {
    store.dispatch(checkAuth());
  }
}

export default checkAuthenticate;