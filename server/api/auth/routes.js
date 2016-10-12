const Router = require('koa-router');
const controller = require('./auth.controller');

const router = new Router({
  prefix: '/api'
});

router.post('/auth/', controller.post);

module.exports = router;