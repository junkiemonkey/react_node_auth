const Router = require('koa-router');
const controller = require('./news.controller');

const router = new Router({
  prefix: '/api'
});

router.get('/news/', controller.getAllNews);

module.exports = router;