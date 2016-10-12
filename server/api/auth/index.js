var router = require('./routes');

module.exports = function(app){
  console.log('index');
  app.use(router.routes());
}