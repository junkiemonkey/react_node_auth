const passport = require('koa-passport');
const User = require('mongoose').model('User');


exports.login = function*(next) {
  var ctx = this;
  yield passport.authenticate('local', function*(err, user, mess){
    if(err) {
      ctx.throw(err);
    }
    if(!user){
      ctx.throw(403, mess.message);
    }
    ctx.req.login(user, function(err){
      console.log('err ' + err);
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
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.body = data;

  });
}

exports.logout = function*(next){
  this.req.logout();
  this.session = null;
  this.statusCode = 200;
  this.body = 'You logged out!';
}

exports.registration = function*(next) {
  var ctx = this;
  yield passport.authenticate('local-signup', function*(err, info){
    if(err) ctx.throw(err);
    ctx.statusCode = 200;
    var data = {
      message: 'User Saved!',
      data: {
        name: info.username,
        email: info.email,
        created: info.created
      }
    };
    ctx.type = 'json';
    ctx.body = data;
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

exports.changeName = function*(next){
  const data = this.request.body;
  const newUser = yield User.findOneAndUpdate({email: data.email}, {$set:{username: data.name}}, {new: true});
  if(!newUser) this.throw(404);
  this.body = newUser.username;
}

exports.changePass = function*(next){
  var ctx = this;
  yield passport.authenticate('local-changepass', function*(err, user, mess){
    if(err) ctx.throw(500, err);
    if(!user) ctx.throw(403, mess);
    ctx.statusCode = 200;
    ctx.body = 'OK!';
  });
}