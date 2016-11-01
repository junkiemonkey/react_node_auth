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

        return done(null, false, { message: 'There is no username or password is incorrect.' });
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
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.checkPassword(req.body.old)) {
        return done(null, false, { message: 'There is no username or password is incorrect.' });
      }

      user.password = password;

      user.save(function(e, user){
        if(e) return done(e);
        return done(null, user);
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
    User.count(function(err, count){
      if(count>5) return done(null, false, {message: 'Database is full!'});
    });
    var user = new User(userData);
    user.save(function(e, user){
      if(e) return done(e);
      return done(null, user);
    });

  }));

module.exports = passport.initialize();