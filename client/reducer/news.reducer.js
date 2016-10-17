import {LOAD_ALL_NEWS, LOAD_ONE_NEWS, SUCCESS, FAIL} from '../constants';

const defaultState = {};

export default (state = defaultState, action) => {
  const {type, res} = action;

  switch (type) {
    case LOAD_ALL_NEWS + SUCCESS:
      return Object.assign({}, state, {
        news: res
      });
    case LOAD_ALL_NEWS + FAIL:
      return state;
    case LOAD_ONE_NEWS + SUCCESS:
      return Object.assign({}, state, {
        one_news: res.data
      });;
    case LOAD_ONE_NEWS + FAIL:
      return state;
    default: return state;
  }

  return state;
}