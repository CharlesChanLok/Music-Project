const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = require('express').Router();
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('../knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

router.post('/save', upload.single('webmasterfile'), (req, res) => {
    knex("songs").insert([{
        "google-users_id": req.user.id, "title": req.file.filename, "duration": req.body.soundInfo,
        "path": req.file.path + ".wav"
    }]).then(() => {
        console.log("Added songs");
    })
    // console.log("req.file", req.file);
    // console.log("req.body", req.body.soundInfo);
})


module.exports = router;