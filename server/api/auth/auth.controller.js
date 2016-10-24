const passport = require('koa-passport');
const User = require('mongoose').model('User');


exports.login = function*(next) {
  var that = this;
  yield passport.authenticate('local', function*(err, user, mess){
    if(err) {
      that.throw(err);
    }
    if(!user){
      that.throw(403, mess.message);
    }
    that.req.login(user, function(err){
      console.log(err);
    });

    var data = {
      message: 'Your in!',
      data: {
        name: user.username,
        email: user.email,
        created: user.created
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
};

exports.check = function*(next){

  if(this.isAuthenticated()){
    const user = {
      email: this.passport.user.email,
      name: this.passport.user.username
    };
    this.statusCode = 200;
    this.body = user;
  }else {
    this.throw(403, 'Access denied!');
  }

  // yield* next;
};