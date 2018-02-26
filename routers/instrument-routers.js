const router = require('express').Router();
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}


router.get('/instrument', isAuthenticated, (req, res) => {
    res.render('instrument', { layout: "instrument" });
})
module.exports = router;