var passport = require('koa-passport');

exports.post = function*(next) {

  // console.log('api post');
  console.log(this.request.body);
  // yield next;
  // yield passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/'
  // });
}