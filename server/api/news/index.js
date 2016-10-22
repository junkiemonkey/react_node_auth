const router = require('./routes');

module.exports = function(app){
  app.use(router.routes());
}