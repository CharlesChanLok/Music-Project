const router = require('express').Router();
const passport = require('passport');
require('../config/strategies/google-strategy');
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }

  res.redirect('/');
}

//auth-login
router.get('/login', (req, res) => {
    res.render('login');
});


//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    res.send('logging out');
});

//auth with goolge
router.get('/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'] 
}));


//route for google to redirect 
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('You are logged in!!!');
})

router.get('/secret', isAuthenticated, (req, res) => {
  res.send('Here you go, a secret');
})

module.exports = router;