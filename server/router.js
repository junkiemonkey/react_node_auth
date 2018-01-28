import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import Router from 'koa-router';
import { routes } from 'config';
import App from '../app/pages';
import store from '../app/store';
import * as newsController from './api/news/controller';

const router = new Router();
const { all, prefix, news, auth } = routes;
// console.dir(newsController.all());

router
  .param('newsBySlug', newsController.getBySlug)
  .param('newsById', newsController.getById)
  .get(news.all, newsController.all)
  .get(news.bySlug, newsController.oneNews)
  // .post(news.all, newsController.save)
  // .patch(news.bySlug, newsController.update)
  // .del(news.byId, newsController.del)

  .get(all, ctx => {
    const context = {};
    const markup = renderToString(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={context} location={ctx.url}>
            <App />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    ctx.body = ctx.render(markup);
  });

export default router;
