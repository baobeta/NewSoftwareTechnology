/* eslint-disable consistent-return */
const passport = require('passport');
const {
  index,
  // loginWithEmail,
} = require('../controller/user.controller');

const router = (app) => {
  app.get('/v1/user', index); // show list of all versions
  app.get('/checkstatus', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'api ok',
    });
  });
  // app.post('/v1/login', loginWithEmail);
  app.get(
    '/v1/login/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
  );
  app.get(
    '/v1/login/google/callback',
    passport.authenticate('google', { failureRedirect: '/err' }),
    (req, res) => {
      res.redirect('/log');
    },
  );
  app.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
};

module.exports = router;
