import { LOGIN, REG, SUCCESS, FAIL } from '../constants';

const defaultState = {
  auth: {
    login: null,
    user: {},
    reg: null,
    error: null
  }
};

export default (state = defaultState, action) => {
  const {type, res} = action;

  switch(type){
    case LOGIN + SUCCESS:
      return Object.assign({}, state, {
        auth: {
          login: true,
          error: false,
          user: res.data
        }
      });
    case LOGIN + FAIL:
      return Object.assign({}, state, {
        auth: {
          login: false,
          error: true
        }
      });
    case REG + SUCCESS:
      return Object.assign({}, state, {
        auth: {
          reg: true,
          user: res.data
        }
      });
    case REG + FAIL:
      return Object.assign({}, state, {
        auth: {
          reg: false,
          error: res
        }
      });
    default: return state;
  }
  return state;
}