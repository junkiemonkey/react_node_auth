import {CHANGE_NAME, CHANGE_PASS} from '../constants';

export function changeName(data){
  return {
    type: CHANGE_NAME,
    payload: data,
    callAPI: '/api/user/name/'
  };
}
export function changePass(data){
  return {
    type: CHANGE_PASS,
    payload: data,
    callAPI: '/api/user/pass/'
  };
}
