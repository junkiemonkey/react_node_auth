var passport = require('koa-passport');
var User = require('mongoose').model('User');


exports.login = function*(next) {

  var that = this;
  yield passport.authenticate('local', function*(err, info, mess){
    if(err) {
      that.throw(err);
    }
    if(!info){
      that.throw(401, mess.message);
    }
    var data = {
      message: 'Your in!',
      data: {
        username: info.username,
        email: info.email,
        created: info.created
      }
    };
    that.body = data;
  });
}

exports.registration = function*(next) {
  var that = this;
  yield passport.authenticate('local-signup', function*(err, info){
    if(err) that.throw(err);
    that.statusCode = 200;
    var data = {
      message: 'User Saved!',
      data: {
        username: info.username,
        email: info.email,
        created: info.created
      }
    };
    that.body = data;
  });
}