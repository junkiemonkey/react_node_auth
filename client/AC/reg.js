import {REG} from '../constants';

export function registrate(username, email, password){
  "use strict";
  return {
    type: REG,
    payload: {username, email, password},
    callAPI: '/api/registration/'
  };
}