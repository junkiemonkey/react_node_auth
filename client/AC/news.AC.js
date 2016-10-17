import {LOAD_ALL_NEWS, LOAD_ONE_NEWS} from '../constants';

export function loadAllNews(){
  return {
    type: LOAD_ALL_NEWS,
    callAPI: '/api/news/'
  };
}

export function loadOneNews(id){
  return {
    type: LOAD_ONE_NEWS,
    newsid: id,
    callAPI: `/api/news/${id}`
  };
}