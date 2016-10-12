import {LOGIN} from '../constants';

export function login(email, password) {
  "use strict";
  return {
    type: LOGIN,
    payload: {email, password},
    callAPI: '/api/auth/'
  };
}