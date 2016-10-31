import {SUCCESS, FAIL, CHANGE_NAME, CHANGE_PASS} from '../constants';
import $ from 'jquery';

export default store => next => action => {
  const {callAPI, type, payload, ...rest} = action;
  if (!callAPI) return next(action);

  const options = {
    url: callAPI,
    type: 'POST',
    data: payload,
    success(res){
      next({type: type + SUCCESS, res, ...rest});
    },
    error(res){
      next({type: type + FAIL, res, ...rest});
    }
  }

  console.log(options.data);

  switch (type) {
    case CHANGE_NAME:
      $.ajax(options);
      break;
    case CHANGE_PASS:
      $.ajax(options);
      break;
    default: next(action)
  }
}