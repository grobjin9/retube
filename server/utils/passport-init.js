module.exports = function (passport) {
  const LocalStrategy = require('passport-local').Strategy;
  const FacebookStrategy = require('passport-facebook').Strategy;

  const config = require('../config').facebook;

  const User = require('../models/User');

  passport.use(new LocalStrategy(function (username, password, done) {
    User.authorize({username, password})
      .then(user => done(null, user))
      .catch(error => done(error));
  }));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new FacebookStrategy({
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {

      User.findOne({ facebookId: profile.id }, function (err, user) {
        if (err) {
          done(err);
        }

        if (!user) {
          const newFacebookUser = new User({
            username: profile.username || profile.displayName,
            avatar: profile.photos[0].value,
            facebookId: profile.id
          });

          newFacebookUser.save()
            .then(() => {
              done(null, user);
            })
            .catch(error => {
              done(error);
            });
        } else {
          done(null, user);
        }
      });
    }
  ));
};

