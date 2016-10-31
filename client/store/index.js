import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducer';
import apiAuth from '../middlewares/api.auth';
import apiNews from '../middlewares/api.news';
import apiSettings from '../middlewares/api.settings';

const enhancer = compose(

  applyMiddleware(apiAuth, apiNews, apiSettings),

  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(reducer, {}, enhancer);
window.store = store;

export default store;