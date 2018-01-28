import Koa from 'koa';
import convert from 'koa-convert';
import { server, secret } from 'config';
import router from './router';
import middlewares from './middlewares';

global.navigator = { userAgent: 'all' };

const app = new Koa();

app.keys = [secret];
middlewares.forEach(mid => app.use(mid));

app.use(router.routes());
  // .use(router.allowedMethods());

app.listen(server.port, server.url);

module.exports = app;
