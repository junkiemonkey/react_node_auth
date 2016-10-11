import { LOGIN, SUCCESS, FAIL } from '../constants';

const defaultState = {

};

export default (state = defaultState, action) => {
  const {type, res} = action;

  switch(type){
    case LOGIN + SUCCESS:
      return state;
    case LOGIN + FAIL:
      return state;
    default: return state;
  }
  return state;
}