import { createStore, applyMiddleware, compose } from 'redux';
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
    return compose(
      ...middlewares,
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  }

  return compose(...middlewares);
}

const enhancer = generateCompose(applyMiddleware(apiNews, routerMiddleware(history))),
  store = createStore(reducers, {}, enhancer);

export default store;