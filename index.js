require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const authRouters = require('./routers/auth-routers');
const passportSetup = require('./config/strategies/google-strategy');
const passport = require('passport');
var exphbs = require('express-handlebars');


var app = express();

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development'

const knexFile = require('./knexfile')[NODE_ENV]
console.log(knexFile);
const knex = require('knex')(knexFile)

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
})
);

app.set('view engine', '.hbs');

//session
app.use(session({
    store: new RedisStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

//set up routes
app.use('/auth', authRouters);

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log('Listening on', port);
})