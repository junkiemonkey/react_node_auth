import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth.reducer';
import news from './news.reducer';

export default combineReducers({
  routing: routerReducer,
  auth,
  news
});