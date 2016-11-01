import { LOGIN, REG, SUCCESS, FAIL, CHECK_AUTH, LOGOUT, CHANGE_NAME, CHANGE_PASS } from '../constants';

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
    case CHANGE_NAME + SUCCESS:
      return Object.assign({}, state, {
        errorChangePass: null,
        user: {
          isAuthenticated: true,
          data: {
            email: state.user.data.email,
            name: res
          }
        }
      })
    case CHANGE_NAME + FAIL:
      return state;
    case CHANGE_PASS + FAIL:
      return Object.assign({}, state, {
        errorChangePass: res.responseText
      })
    default: return state;
  }
  return state;
}