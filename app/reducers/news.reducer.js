import { createAction, handleActions } from 'redux-actions';
import omit from 'lodash.omit';
import {LOAD_ALL_NEWS, LOAD_ONE_NEWS, SUCCESS, FAIL, EDIT_NEWS, SAVE_NEWS, ADD_NEWS, DELETE_NEWS, UPDATE_NEWS} from '../constants';

const url = '/api/news/';
const defaultState = {};

/**
 * Actions
 */
export const loadAllNews = createAction(LOAD_ALL_NEWS, null, () => ({ callApi: url }));


/**
 * Reducer
 */
export default handleActions({
  [LOAD_ALL_NEWS + SUCCESS]: (state, { payload }) => {
    return { ...state, list: payload };
  },
  [LOAD_ALL_NEWS + FAIL]: (state, {payload}) => {
    console.error(payload);
    return state;
  },


}, defaultState);

// export default (state = defaultState, action) => {
//   const {
//     type, res, isNew, ...rest
//   } = action;
//
//   switch (type) {
//     case LOAD_ALL_NEWS + SUCCESS:
//       return Object.assign({}, state, {
//         news: res
//       });
//     case LOAD_ALL_NEWS + FAIL:
//       return state;
//     case LOAD_ONE_NEWS + SUCCESS:
//       return Object.assign({}, state, {
//         one_news: res
//       });
//     case LOAD_ONE_NEWS + FAIL:
//       return state;
//     case ADD_NEWS:
//       if (!isNew) {
//         const newState = omit(state, 'is_edit_news');
//         return Object.assign({}, newState, {
//           is_new_news: isNew
//         });
//       }
//       return Object.assign({}, state, {
//         is_new_news: isNew
//       });
//
//     case EDIT_NEWS: {
//       return {...state, is_edit_news: true};
//     }
//
//     case SAVE_NEWS + SUCCESS: {
//       const newArray = state.news.concat([res]);
//       return {
//         ...state,
//         news: newArray,
//         news_saved: true,
//         is_new_news: false
//       };
//     }
//
//     case SAVE_NEWS + FAIL: {
//       return {
//         ...state,
//         news_saved: false,
//         is_new_news: false
//       };
//     }
//
//     case DELETE_NEWS + SUCCESS: {
//       const {newsid} = rest;
//       const news = state.news.filter(news => news._id != newsid);
//       return {
//         ...state,
//         news
//       };
//     }
//
//     case DELETE_NEWS + FAIL: return state;
//     case UPDATE_NEWS + SUCCESS: {
//       const updateNewsList = state.news.filter(nw => nw._id != res._id);
//       const updatedNews = updateNewsList.concat([res]);
//       return {
//         ...state,
//         news: updatedNews,
//         news_saved: true,
//         is_edit_news: false
//       };
//     }
//
//     case UPDATE_NEWS + FAIL:
//       return {
//         ...state,
//         news_saved: false,
//         is_edit_news: false
//       };
//     default: return state;
//   }
// };
