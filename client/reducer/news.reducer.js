import {LOAD_ALL_NEWS, LOAD_ONE_NEWS, SUCCESS, FAIL, EDIT_NEWS, SAVE_NEWS, ADD_NEWS, DELETE_NEWS, UPDATE_NEWS} from '../constants';
import _ from 'lodash';

const defaultState = {};

export default (state = defaultState, action) => {
  const {type, res, isNew, ...rest} = action;
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
    case ADD_NEWS:
      if(!isNew) {
        var newState = _.omit(state, 'is_edit_news');
        return Object.assign({}, newState, {
          is_new_news: isNew
        });
      }
      return Object.assign({}, state, {
        is_new_news: isNew
      });
    case EDIT_NEWS:
      return Object.assign({}, state, {
        is_edit_news: true,
      });
    case SAVE_NEWS + SUCCESS:
      const newArray = state.news.concat([res]);
      return Object.assign({}, state, {
        news: newArray,
        news_saved: true,
        is_new_news: false
      });
    case SAVE_NEWS + FAIL:
      return Object.assign({}, state, {
        news_saved: false,
        is_new_news: false
      });
    case DELETE_NEWS + SUCCESS:
      const {newsid} = rest;
      const newState = state.news.filter(news => news._id != newsid);
      return Object.assign({}, state, {
        news: newState
      });
    case DELETE_NEWS + FAIL:
      return state;
    case UPDATE_NEWS + SUCCESS:
      const updateNewsList = state.news.filter(nw => nw._id != res._id);
      const updatedNews = updateNewsList.concat([res]);
      return Object.assign({}, state, {
        news: updatedNews,
        news_saved: true,
        is_edit_news: false
      });
    case UPDATE_NEWS + FAIL:
      return Object.assign({}, state, {
        news_saved: false,
        is_edit_news: false
      });
    default: return state;
  }

  return state;
}