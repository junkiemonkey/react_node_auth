import { combineReducers } from 'redux';
import auth from './auth.reducer';
import news from './news.reducer';

export default combineReducers({
  auth, news
});