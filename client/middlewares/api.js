import {SUCCESS, FAIL} from '../constants';
import fetch from 'whatwg-fetch';

export default store => next => action => {
  const {callAPI, type, payload, ...rest} = action;

  if (!callAPI) return next(action)

  fetch(callAPI, {
    method: 'POST',
    body: {
      username: payload.user,
      password: payload.pass
    }
  }).then(res => {
    next({type: type + SUCCESS, res, ...rest});
  }).catch(e => {
    next({type: type + FAIL, e, ...rest});
  })
};
