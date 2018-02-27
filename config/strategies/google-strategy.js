require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('../../knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

passport.serializeUser((user, done) => {
    console.log("serialize:" + user);
    done(null, user)
})

passport.deserializeUser((user, done) => {
    console.log("deserialize:" + id);
    done(null, user);
    //let query = knex.select("*").from("google_users").where("id", id);
    //query.then((user) => {
    //    done(null, user)
    //})
    //    .catch((err) => {
    //        done(err);
    //    })
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
        let query = knex.first("*").from("google_users").where("gmail", gmail);
        query.then((guser) => {
            //console.log(user);
            // if the user never register, add the user to the db
            if (!guser) {
                knex("google_users").insert([{ "firstname": firstName, "lastname": lastName, "gmail": gmail, "googleid": googleID }])
                    .then(() => {
                        let query = knex.first("*").from("google_users").where("gmail", gmail);
                        query.then((user) => {
                            console.log(`Created users: ${firstName} ${lastName} gmail: ${gmail} GoogleID: ${googleID}`);
                            done(null, user);
                        })
                    })
            }
            else {
                    done(null, guser);
            }
        }).catch((err) => {
            console.log(err)
            done(err);
        });
    })
);