const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');
const { validateSignIn, validateSignUp } = require('../utils/validations/loginFormValidations');
const { formatUserObject } = require('../utils/format');

router.post('/signin', function (req, res, next) {
  const { errors, isValid } = validateSignIn(req.body);

  if (isValid) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        errors.status = err.message;
        return res.status(400).json(errors);
      }
      if (!user) {
        errors.status = "User does not exist";
        return res.status(400).json(errors);
      }

      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({"success": true});
      });
    })(req, res, next);

  } else {
    return res.status(400).json(errors);
  }

});

router.post('/signup', function (req, res, next) {
  const { errors, isValid } = validateSignUp(req.body);

  if (isValid) {
    User.register(req.body)
      .then(() => {
        passport.authenticate('local', function (err, user, info) {
          if (err) {
            errors.status = err.message;
            return res.status(400).json(errors);
          }
          if (!user) {
            errors.status = err.message;
            return res.status(400).json(errors);
          }

          req.login(user, function (err) {
            if (err) {
              return next(err);
            }

            return res.status(200).json({"success": true});
          });
        })(req, res, next);
      })
      .catch(e => {
        errors.status = e.message;
        return res.status(400).json(errors);
      });
  } else {
    return res.status(400).json(errors);
  }
});

router.get('/signout', function (req, res, next) {
  req.logout(); // not working properly
  req.session.destroy();

  return res.status(200).json({success: true});
});

router.get('/verify', function (req, res, next) {
  if (req.user) {
    return res.status(200).json(formatUserObject(req.user));
  }

  return res.status(401).json({success: false});
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
