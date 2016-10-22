import { LOGIN, REG, SUCCESS, FAIL, CHECK_AUTH, LOGOUT } from '../constants';

const defaultState = {

};

export default (state = defaultState, action) => {
  const {type, res} = action;
  // console.log(res);
  switch(type){
    case LOGIN + SUCCESS:
      return Object.assign({}, state, {
        user: {
          isAuthenticated: true,
          data: res.data
        }

      });
    case LOGIN + FAIL:
      return Object.assign({}, state, {
        user: {
          isAuthenticated: false
        }
      });
    case LOGOUT + SUCCESS:
      return Object.assign({}, state, {
        user: {
          isAuthenticated: false,
          data: null
        }
      });
    case LOGOUT + FAIL:
      return Object.assign({}, state, {
        user: {
          isAuthenticated: false,
          data: null
        }
      });
    case REG + SUCCESS:
      return Object.assign({}, state, {
        user: {
          isAuthenticated: false,
          reg: true
        }
      });
    case REG + FAIL:
      return Object.assign({}, state, {
        user: {
          isAuthenticated: false,
          reg: false
        }
      });
    case CHECK_AUTH + SUCCESS:
      return Object.assign({}, state, {
        user: {
          isAuthenticated: true,
          data: res
        }
      });
    case CHECK_AUTH + FAIL:
      return Object.assign({}, state, {
        user: {
          isAuthenticated: false
        }
      });
    default: return state;
  }
  return state;
}