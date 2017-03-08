const mongoose = require('../db/mongoose');
const crypto = require('crypto');
const AuthError = require('../errors/AuthError');
const ServerError = require('../errors/ServerError');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  hashedPassword: {
    type: String
  },
  salt: {
    type: String
  },
  avatar: {
    type: String
  },
  facebookId: {
    type: String
  },
  favoriteChatrooms: [{ type: mongoose.Schema.ObjectId, ref: 'ChatRoom' }]
});

userSchema.set('timestamps', true);

/*
* Middleware
* */
userSchema.pre('save', function (next) {
  if (!this.avatar) {
    this.avatar = `https://api.adorable.io/avatars/35/${this.username}`;
  }

  next();
});

/*
* Methods
* */
userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

/*
* Static methods
* */
userSchema.statics.authorize = function ({username, password}) {
  const User = this;

  return User
    .findOne({username: username.toLowerCase()})
    .then(user => {
      return new Promise((resolve, reject) => {
        if (user) {
          if (user.checkPassword(password)) {
            resolve(user);
          }

          reject(new AuthError('Invalid Password'));
        }

        reject(new AuthError('Invalid Username or Password'));
      });
    })
};

userSchema.statics.register = function ({username, password}) {
  const User = this;

  return User.findOne({username: username.toLowerCase()})
    .then(user => {
      return new Promise((resolve, reject) => {
        if (user) {
          reject(new AuthError('This username is already taken'));
          return;
        }

        resolve(new User({username, password}).save());
      });
    });
};

userSchema.statics.toggleFavoriteRoom = function (userId, roomId, isFavorite) {
  const User = this;
  const operator = isFavorite ? {$pullAll: {favoriteChatrooms: [roomId]}} : {$addToSet: {favoriteChatrooms: roomId}};

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: userId }, operator)
      .then(result => {
        resolve(result);
      })
      .catch(() => {
        reject(new ServerError("Error connecting to database"));
      });
  });
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;