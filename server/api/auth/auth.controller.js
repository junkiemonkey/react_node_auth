const passport = require('koa-passport');
const User = require('mongoose').model('User');


export const login = async (ctx, next) => {
  await passport.authenticate('local', (err, user, mess) => {
    if (err) {
      ctx.throw(err);
    }
    if (!user){
      ctx.throw(403, mess.message);
    }
    ctx.login(user, err => {
      console.log('err ' + err);
    });

    const data = {
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

  })(ctx, next);
}

export const logout = async ctx => {
  ctx.logout();
  ctx.session = null;
  ctx.statusCode = 200;
  ctx.body = 'You logged out!';
}

export const registration = async (ctx, next) =>  {
  await passport.authenticate('local-signup', (err, info) => {
    if (err) ctx.throw(err);
    ctx.statusCode = 200;
    const data = {
      message: 'User Saved!',
      data: {
        name: info.username,
        email: info.email,
        created: info.created
      }
    };
    ctx.type = 'json';
    ctx.body = data;
  })(ctx, next);
};

export const check = ctx => {
  if (ctx.isAuthenticated()){
    const user = {
      email: ctx.state.user.email,
      name: ctx.state.user.username
    };
    ctx.statusCode = 200;
    this.body = user;
  } else {
    ctx.throw(403, 'Access denied!');
  }
  // yield* next;
};

export const changeName = async ctx => {
  const data = ctx.request.body;
  const newUser = await User.findOneAndUpdate({email: data.email}, {$set:{username: data.name}}, {new: true});
  if (!newUser) this.throw(404);
  this.body = newUser.username;
}

export const changePass = async (ctx, next) => {
  await passport.authenticate('local-changepass', (err, user, mess) => {
    if (err) ctx.throw(500, err);
    if (!user) ctx.throw(403, mess);
    ctx.statusCode = 200;
    ctx.body = 'OK!';
  })(ctx, next);
}