const Router = require('koa-router');
const controller = require('./auth.controller');

const router = new Router({
  prefix: '/api'
});

router.post('/auth/', controller.login);
router.post('/registration/', controller.registration);

module.exports = router;