import {SUCCESS, FAIL, CHECK_AUTH, LOGOUT, LOGIN, LOAD_ONE_NEWS, LOAD_ALL_NEWS, SAVE_NEWS, DELETE_NEWS, UPDATE_NEWS, REG} from '../constants';
import $ from 'jquery';

export default store => next => action => {
  const {callAPI, type, payload, ...rest} = action;

  if (!callAPI) return next(action);
  if(rest.hasOwnProperty('isNew')) return next(action);

  switch (type) {
    case REG:
      $.post({
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
        .fail(res => next({type: type + FAIL, res, ...rest}));
      break;
    case LOAD_ONE_NEWS:
      $.get(callAPI)
        .done(res => next({type: type + SUCCESS, res, ...rest}))
        .fail(res => next({type: type + FAIL, res, ...rest}));
      break;
    case SAVE_NEWS:
      const fd = new FormData();
      for(let key in payload){
        fd.append(key, payload[key])
      }
      $.ajax({
        url: callAPI,
        type: 'POST',
        data: fd,
        cache: false,
        contentType: false,
        processData: false,
        success(res){
          next({type: type + SUCCESS, res, ...rest});
        },
        error(res){
          next({type: type + FAIL, res, ...rest});
        }
      });
      break;
    case DELETE_NEWS:
      $.ajax({
        url: callAPI,
        type: 'DELETE',
        success(res){
          next({type: type + SUCCESS, res, ...rest});
        },
        error(res){
          next({type: type + FAIL, res, ...rest});
        }
      });
      break;
    case UPDATE_NEWS:
      let data;
      if(payload.file) {
        data = new FormData();
        for(let key in payload){
          data.append(key, payload[key])
        }
      }else data = JSON.stringify(payload);
      $.ajax({
        url: callAPI,
        type: 'PATCH',
        data: data,
        cache: false,
        contentType: payload.file === null ? 'application/json' : false,
        processData: payload.file === null,
        success(res){
          next({type: type + SUCCESS, res, ...rest});
        },
        error(res){
          next({type: type + FAIL, res, ...rest});
        }
      });
      break;
    default:
      next(action)
  }



};
