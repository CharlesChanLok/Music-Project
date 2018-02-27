const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/strategies/local-strategy');
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}
//login
  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/instrument',
    failureRedirect: '/error'
  }));

//signup
  router.get('/signup', (req, res) => {
    res.render('signup');
  });

  router.post('/signup', passport.authenticate('local-register', {
    successRedirect: '/instrument',
    failureRedirect: '/error'
  }));


module.exports = router;