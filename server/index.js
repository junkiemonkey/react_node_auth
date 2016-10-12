const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(process.cwd(), 'server/config');
const koa = require('koa');
const app = koa();
const config = require('config');
const fs = require('fs');
const Router = require('koa-router');


// console.log(path.join(process.cwd(), 'server/config'))

var router = new Router();

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function(middleware) {
  app.use(require('./middlewares/' + middleware));
});

require('./api/auth')(app);

router.get('*', function*(next){
  this.body = 'ok';
});

app.use(router.routes());

app.listen(3000);