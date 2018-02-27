require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('../../knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

function register(req, email, password, done) {
    console.log("local-strategy.js,(register) pwd:" + req.body.password + "-p1-" + password)
    if (req.body.password2 !== password) {
        console.log("not match")
        return done(null, false, { message: "Passwords do not match." });
    }
    //check if it is a valid email

    let query = knex.select("*").from("local_users").where("email", email);
    query.then((user) => {
        console.log(user);
        if (user[0]) {
            return done(null, false, { message: "Email already exists." });
        }
        bcrypt.hash(password, 12, (err, hash) => {
            if (err) {
                return done(err);
            }
            const newUser = {
                email: email,
                password: hash,
            }
            knex("local_users").insert(newUser)
                .then(() => {
                    let query = knex.first("*").from("local_users").where("email", email);
                    query.then(() => {
                        console.log(`Created users: ${newUser.email}`);
                        return done(null, newUser);
                    })
                })
        })
    })
        .catch((err) => {
            return done(err);
        })
}

function authenticate(email, password, done) {
    let query = knex.first("*").from("local_users").where("email", email);
    query.then((user) => {
        if (!user) {
            return done(null, false, { message: "Incorrect email or password." });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            console.log(password, "---", user.password)
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Incorrect email or password." });
            }
        });
    })
        .catch((err) => {
            return done(err);
        })
}
passport.use('local-login', new LocalStrategy(authenticate));
passport.use('local-register', new LocalStrategy({
    passReqToCallback: true
}, register))

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {

//     let query = knex.select("*").from("local_users").where("id", id);
//     query.then((user) => {
//         done(null, user)
//     })
//         .catch((err) => {
//             done(err);
//         })
// });

