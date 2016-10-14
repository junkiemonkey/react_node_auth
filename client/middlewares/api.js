import {SUCCESS, FAIL, CHECK_AUTH} from '../constants';
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
    default:
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
  }



};
