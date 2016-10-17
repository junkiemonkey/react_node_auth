import {SUCCESS, FAIL, CHECK_AUTH, LOGOUT, LOGIN, LOAD_ONE_NEWS, LOAD_ALL_NEWS} from '../constants';
import $ from 'jquery';

export default store => next => action => {
  const {callAPI, type, payload, ...rest} = action;

  if (!callAPI) return next(action);

  switch (type) {
    case CHECK_AUTH:
      $.get(callAPI)
        .done(res => next({type: type + SUCCESS, res, ...rest}))
        .fail(res => next({type: type + FAIL, res, ...rest}));
        break;
    case LOGOUT:
      $.ajax({
        url: callAPI,
        type: 'POST',
        success(res){
          next({type: type + SUCCESS, res, ...rest});
        },
        error(res){
          next({type: type + FAIL, res, ...rest});
        }
      })
      break;
    case LOGIN:
      $.ajax({
        url: callAPI,
        type: 'POST',
        data: payload,
        xhrFields: {
          withCredentials: true
        },
        success(res){
          next({type: type + SUCCESS, res, ...rest});
        },
        error(res){
          next({type: type + FAIL, res, ...rest});
        }
      });
      break;
    case LOAD_ALL_NEWS:
      $.get(callAPI)
        .done(res => next({type: type + SUCCESS, res, ...rest}))
        .fail(res => next({type: type + FAIL, res, ...rest}))
    case LOAD_ONE_NEWS:
      $.get(callAPI)
        .done(res => next({type: type + SUCCESS, res, ...rest}))
        .fail(res => next({type: type + FAIL, res, ...rest}))
    default:
      next(action)
  }



};
