"use strict";
import {LOGIN, REG, CHECK_AUTH} from '../constants';

export function login(email, password) {
  return {
    type: LOGIN,
    payload: {email, password},
    callAPI: '/api/auth/'
  };
}

export function registrate(username, email, password){
  return {
    type: REG,
    payload: {username, email, password},
    callAPI: '/api/registration/'
  };
}

export function checkAuth(){
  return {
    type: CHECK_AUTH,
    callAPI: '/api/check/'
  };
}