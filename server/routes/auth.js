import express from 'express';
import passport from 'passport';
import debug from 'debug';

const router = new express.Router();

router.post('/signup', (req, res, next) => {
  return passport.authenticate('local-signup', (err, token, userData) => {
    if (err) {
      console.log('err', err);
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
      console.log('err', err);
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

router.get('/facebook', passport.authenticate('facebook-login'));

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook-login', (err, token, userId) => {
    if (err) {
      console.log('ROUTES/AUTH Facebook login error : ', err);
      return res.status(400).json({
        message: 'Error with Facebook login',
      });
    }
    const tokenStr = encodeURIComponent(token + userId);
    res.redirect(`/#/token/${tokenStr}`);
  })(req, res, next);
});

export default router;
