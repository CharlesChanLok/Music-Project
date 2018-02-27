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
    res.render('login', {user: req.user});
});


//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logout();
    res.redirect('/');
});

//auth with goolge
router.get('/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
] 
}));


//route for google to redirect 
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: "/"
}), (req, res) => {
   // res.redirect('/profile');
    res.render('profile', { user: req.user[0] });
})

// router.get('/secret', isAuthenticated, (req, res) => {
//   res.send('Here you go, a secret');
// })

module.exports = router;