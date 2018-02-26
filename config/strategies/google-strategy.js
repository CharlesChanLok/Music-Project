require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('../../knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

passport.serializeUser((user, done) => {
    console.log("serialize:" + user[0].id);
    done(null, user[0].id)
})

passport.deserializeUser((id, done) => {
    console.log("deserialize:" + id);
    let query = knex.select("*").from("users_google").where("id", id);
    query.then((user) => {
        done(null, user)
    })
        .catch((err) => {
            done(err);
        })
})

passport.use(new GoogleStrategy(
    {
        // options for the google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        let firstName = profile.name.givenName;
        let lastName = profile.name.familyName;
        let googleID = profile.id;
        let gmail = profile.emails[0].value;

        // console.log(typeof firstName);
        // console.log(typeof lastName);
        // console.log(typeof googleID);
        // console.log(firstName);
        // console.log(lastName);
        // console.log(googleID);
        // console.log(profile); 
        let query = knex.select("*").from("users_google").where("gmail", gmail);
        query.then((user) => {
            //console.log(user);
            // if the user never register, add the user to the db
            if (!user[0]) {
                knex("users_google").insert([{ "firstname": firstName, "lastname": lastName, "gmail": gmail, "googleid": googleID }])
                    .then(() => {
                        let query = knex.select("*").from("users_google").where("gmail", gmail);
                        query.then((user) => {
                            console.log(`Created users: ${firstName} ${lastName} gmail: ${gmail} GoogleID: ${googleID}`);
                            done(null, user);
                        })
                    })
            }
            else {
                    done(null, user);
            }
        }).catch((err) => {
            console.log(err)
            done(err);
        });
    })
);