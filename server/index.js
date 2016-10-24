const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(process.cwd(), 'server/config');
process.env.NODE_ENV = 'production';

const koa = require('koa');
const app = koa();
const config = require('config');
const fs = require('fs');
const Router = require('koa-router');
const mongoose = require('./db/mongoose');

app.keys = [config.secret];

var router = new Router();

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function(middleware) {
  app.use(require('./middlewares/' + middleware));
});

require('./api/auth')(app);
require('./api/news')(app);

router.get('*', function*(next){
  this.body = './index.html';
});

app.use(router.routes());

console.log('served on: ' + config.server.port + ' ' + config.server.url);

app.listen(config.server.port, config.server.url);

module.exports = app;

// module.exports = {
//   server : server,
//   app : app
// };