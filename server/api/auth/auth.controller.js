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

    var data = {
      message: 'Your in!',
      data: {
        name: info.username,
        email: info.email,
        created: info.created
      }
    };

    // that.type = 'json';
    that.set('Access-Control-Allow-Credentials', true);
    that.body = data;

  });
}

exports.logout = function*(next){
  this.req.logout();
  this.session = null;
  this.statusCode = 200;
  this.body = 'You logged out!';
}

exports.registration = function*(next) {
  var that = this;
  yield passport.authenticate('local-signup', function*(err, info){
    if(err) that.throw(err);
    that.statusCode = 200;
    var data = {
      message: 'User Saved!',
      data: {
        name: info.username,
        email: info.email,
        created: info.created
      }
    };
    that.type = 'json';
    that.body = data;
  });
}

exports.check = function*(next){

  if(this.isAuthenticated()){
    const user = {
      email: this.passport.user.email,
      name: this.passport.user.username
    };
    this.statusCode = 200;
    this.body = user;
  }else {
    this.throw(401, 'Access denied!');
  }

  // yield* next;
}