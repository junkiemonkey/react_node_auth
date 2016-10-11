const koa = require('koa');
const app = koa();
const config = require('config');
const path = require('path');
const fs = require('fs');



const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function(middleware) {
  app.use(require('./middlewares/' + middleware));
});

require('./api/auth')(app);

app.listen(3000);