const Router = require('koa-router');
const controller = require('./auth.controller');

const router = new Router({
  prefix: '/api'
});

router.post('/auth/', controller.login);
router.post('/logout/', controller.logout);
router.post('/registration/', controller.registration);
router.post('/user/name/', controller.changeName);
router.post('/user/pass/', controller.changePass);
router.get('/check/', controller.check);

module.exports = router;