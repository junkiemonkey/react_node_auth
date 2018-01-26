import {LOAD_ALL_NEWS, LOAD_ONE_NEWS, DELETE_NEWS, EDIT_NEWS, SAVE_NEWS, ADD_NEWS, UPDATE_NEWS} from '../constants';

const url = `/api/news/`;

export function loadAllNews(){
  return {
    type: LOAD_ALL_NEWS,
    callAPI: url
  };
}

export function loadOneNews(slug){
  return {
    type: LOAD_ONE_NEWS,
    // newsid: id,
    callAPI: url + `${slug}`
  };
}

export function deleteNews(id){
  return {
    type: DELETE_NEWS,
    newsid: id,
    callAPI: url + `${id}`
  };
}

export function addNews(add){
  return {
    type: ADD_NEWS,
    isNew: add
  };
}

export function editNews(){
  return {
    type: EDIT_NEWS
  }
}

export function saveNews(data){
  // console.log(data);
  return {
    type: SAVE_NEWS,
    callAPI: url,
    payload: data
  };
}

export function updateNews(data, slug){
  return {
    type: UPDATE_NEWS,
    callAPI: url + `${slug}`,
    payload: data
  }
}