var passport = require('koa-passport');
var User = require('mongoose').model('User');
var mongoose = require('mongoose');


exports.login = function*(next) {
  var that = this;
  yield passport.authenticate('local', function*(err, info, mess){
    if(err) {
      that.throw(err);
    }
    if(!info){
      that.throw(401, mess.message);
    }
    that.req.login(info, function(err){
      console.log(err);
    });

    console.log('here')

    var data = {
      message: 'Your in!',
      data: {
        username: info.username,
        email: info.email,
        created: info.created
      }
    };

    // that.type = 'json';
    that.set('Access-Control-Allow-Credentials', true);
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
    that.type = 'json';
    that.body = data;
  });
}

exports.check = function*(next){
  var ctx = this;
  console.log(ctx.isAuthenticated());
  // console.log(this.passport);
  if(ctx.isAuthenticated()){

    ctx.statusCode = 200;
    ctx.body = 'ok';
  }else {
    ctx.throw(401, 'Access denied!');
  }

  // yield* next;
}