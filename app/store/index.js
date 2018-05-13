import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import reducers from '../reducers';
// import apiAuth from '../middlewares/api.auth';
import apiNews from '../middlewares/api.news';
// import apiSettings from '../middlewares/api.settings';

const { env: {NODE_ENV, BROWSER} } = process;

export const history = BROWSER ? createBrowserHistory() : createMemoryHistory();

function generateCompose(...middlewares) {
  if (NODE_ENV === 'development') {
    return composeWithDevTools(...middlewares);
  }
  return compose(...middlewares);
}

const enhancer = generateCompose(applyMiddleware(apiNews, routerMiddleware(history), thunk)),
  store = createStore(reducers, {}, enhancer);

export default store;
