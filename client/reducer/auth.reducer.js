import { LOGIN, REG, SUCCESS, FAIL, CHECK_AUTH } from '../constants';

const defaultState = {

};

export default (state = defaultState, action) => {
  const {type, res} = action;

  switch(type){
    case LOGIN + SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: res.data
      });
    case LOGIN + FAIL:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    case REG + SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        reg: true
      });
    case REG + FAIL:
      return Object.assign({}, state, {
        isAuthenticated: false,
        reg: false
      });
    case CHECK_AUTH + SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true
      });
    case CHECK_AUTH + FAIL:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    default: return state;
  }
  return state;
}