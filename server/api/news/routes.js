const Router = require('koa-router');
const controller = require('./news.controller');

const router = new Router({
  prefix: '/api'
});

router
  .param('newsById', controller.newsById)
  .param('newsBySlug', controller.newsBySlug)
  .get('/news/', controller.getAllNews)
  .get('/news/:newsBySlug', controller.getOneNews)
  .post('/news/', controller.saveNews)
  .patch('/news/:newsBySlug', controller.updateNews)
  .del('/news/:newsById', controller.deleteNews)

module.exports = router;