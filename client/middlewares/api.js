import {SUCCESS, FAIL} from '../constants';
import $ from 'jquery';

export default store => next => action => {
  const {callAPI, type, payload, ...rest} = action;

  if (!callAPI) return next(action);

  $.ajax({
    url: callAPI,
    type: 'POST',
    data: payload,
    success(res){
      next({type: type + SUCCESS, res, ...rest});
    },
    error(e){
      next({type: type + FAIL, e, ...rest});
    }
  });

};
