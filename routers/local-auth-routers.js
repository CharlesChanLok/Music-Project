const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}
router.get('/secret', isAuthenticated, (req, res) => {

})
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/session',
    failureRedirect: 'back'
}))

// .post('/register', passport.authenticate('local-register', {
//   successRedirect: '/session',
//   failureRedirect: 'back'
// }));

module.exports = router;