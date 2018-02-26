require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('../../knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

passport.use('local-login', new LocalStrategy(authenticate));

passport.serializeUser((user, done) => {
    done(null, user[0].id);
});

passport.deserializeUser((id, done) => {

    let query = knex.select("*").from("local_users").where("id", id);
    query.then((user) => {
        done(null, user)
    })
        .catch((err) => {
            done(err);
        })
});

function authenticate(account, password, done) {
    console.log(password)
    let query = knex.select("*").from("local_users").where("account", account);
    query.then((user) => {
        if (!user[0] || password !== user[0].password) {
            return done(null, false, { message: "Incorrect email or password." });
        }
        return done(null, user)
    })
        .catch((err) => {
            return done(err);
        })
}