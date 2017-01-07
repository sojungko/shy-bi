const express = require('express');
const passport = require('passport');

const router = new express.Router();

router.post('/signup', (req, res, next) => {
  return passport.authenticate('local-signup', (err, token, userData) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up.',
      token,
      user: userData,
    });
  })(req, res, next);
});

router.post('/signin', (req, res, next) => {
  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in.',
      token,
      user: userData,
    });
  })(req, res, next);
});

router.get('/facebook', passport.authenticate('facebook-login', { scope: 'email' } ));

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook-login', (err, token) => {
    if (err) {
      console.log('error authenticating : ', err);
      return res.status(400).json({
        message: 'Error with facebook login.',
      });
    }
    res.redirect('/#/');
  })(req, res, next);
});


module.exports = router;
