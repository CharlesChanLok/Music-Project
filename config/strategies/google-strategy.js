require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
    // options for the google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //passport cb funtion
        console.log('passport cb function fired');
        console.log(profile);
        
    })
);