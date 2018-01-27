import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import Router from 'koa-router';
import App from '../app/pages';
import store from '../app/store';

const router = new Router();

router.get('*', (ctx, next) => {
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
  // ctx.body = 'hello';
});

export default router.routes();
