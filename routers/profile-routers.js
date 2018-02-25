const router = require('express').Router();

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

router.get('/', isAuthenticated, (req, res) => {
        res.render('profile', {user: req.user[0]});

});

module.exports = router;