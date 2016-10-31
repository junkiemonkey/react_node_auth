const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user.id); // uses _id as idFieldd
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email', // 'username' by default
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.checkPassword(password)) {

        return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
      }
      return done(null, user);
    });
  }
));

passport.use('local-changepass', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done){
  console.log(req);
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.checkPassword(req.body.old)) {

        return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
      }
      User.update({email: email}, {$set: {password: password}}, function(err, user){
        if(err) done(err);
        done(null, user);
      });
    });
  }
));

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done){
    var userData = {
      email: email.trim(),
      password: password.trim(),
      username: req.body.username.trim()
    };
    var user = new User(userData);
    user.save(function(e, user){
      if(e) return done(e);
      return done(null, user);
    });

  }));

module.exports = passport.initialize();