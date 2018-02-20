require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const NODE_ENV = process.env.NODE_ENV || 'development' 
const knexFile = require('../../knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

passport.use(new GoogleStrategy({
    // options for the google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        let firstName = profile.name.givenName;
        let lastName = profile.name.familyName;
        let googleID = profile.id;
        // console.log(typeof firstName);
        // console.log(typeof lastName);
        // console.log(typeof googleID);
        console.log(firstName);
        console.log(lastName);
        console.log(googleID);
        console.log(profile);
        knex("users").insert({firstname:firstName, lastname:lastName, googleid:googleID})
        .then((content) => {
            console.log(content);
        }) 

    })
);