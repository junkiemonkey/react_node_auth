import crypto from 'crypto';
import config from 'config';
import mongoose from '../../db/mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required'
  },
  email: {
    type: String,
    unique: true,
    required: 'Email is required and must be a unique',
    validate: [{
      validator: function (value) {
        return this.deleted ? true : /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
      },
      msg: 'Email is not correct!'
    }]
  },
  passwordHash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.virtual('password')
  .set(function(password) {
    if (password !== undefined) {
      if (password.length < 4) {
        this.invalidate('password', 'Password must be min 4 symbols!');
      }
    }

    this._plainPassword = password;

    if (password) {
      this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
      this.passwordHash = getHash(password, this.salt);
    } else {
      // remove password (unable to login w/ password any more, but can use providers)
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function() {
    return this._plainPassword;
  });

UserSchema.methods.checkPassword = function (password) {
  if (!password) return false; // empty password means no login by password

  if (!this.passwordHash) return false; // this user does not have password (the line below would hang!)

  return getHash(password, this.salt) == this.passwordHash;
};

function getHash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, config.crypto.hash.iterations, config.crypto.hash.length, 'SHA1');
}

export default mongoose.model('User', UserSchema);
