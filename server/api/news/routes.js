const Router = require('koa-router');
const controller = require('./news.controller');

const router = new Router({
  prefix: '/api'
});

router
  .param('newsById', controller.newsById)
  .get('/news/', controller.getAllNews)
  .post('/news/', controller.saveNews)
  .del('/news/:newsById', controller.deleteNews)

module.exports = router;