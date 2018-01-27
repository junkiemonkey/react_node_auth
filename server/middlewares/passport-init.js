import passport from 'koa-passport';
import Local from 'passport-local';
import User from '../models/user';

const LocalStrategy = Local.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email', // 'username' by default
    passwordField: 'password'
  }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);
      if (!user || !user.checkPassword(password)) {
        return done(null, false, { message: 'There is no username or password is incorrect.' });
      }
      return done(null, user);
    });
  }
));

passport.use('local-changepass', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (!user || !user.checkPassword(req.body.old)) {
        return done(null, false, { message: 'There is no username or password is incorrect.' });
      }
      user.password = password;
      user.save((e, user) => {
        if (e) return done(e);
        return done(null, user);
      });
    });
  }
));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
      username: req.body.username.trim()
    };
    User.count((err, count) => {
      if (count > 5) return done(null, false, {message: 'Database is full!'});
    });
    const user = new User(userData);
    user.save((e, user) => {
      if (e) return done(e);
      return done(null, user);
    });
  }));

export default passport.initialize();