import {LOGIN} from '../constants';

export function login(user, pass) {
  "use strict";
  return {
    type: LOGIN,
    payload: {user, pass},
    callAPI: '/api/auth/'
  };
}