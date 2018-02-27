require('dotenv').config();

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
//Session
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
//Router
const authRouters = require('./routers/auth-routers');
const localAuthRouters = require('./routers/local-auth-routers');
const profileRouters = require('./routers/profile-routers');
const instrumentRouters = require('./routers/instrument-routers');
//passport setup
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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', '.hbs');
app.use(express.static('public'));


//session
app.use(session({
    store: new RedisStore(),
    secret: process.env.SESSION_SECRET,
    cookie: { "path": '/', "httpOnly": true, "secure": false,  "maxAge": null },
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())

//set up routes
app.use('/profile', profileRouters);
app.use('/auth', authRouters);
app.use('/local', localAuthRouters)
app.use('/', instrumentRouters);

app.get('/', (req, res) => {
    res.render('home', {user: req.user});
})

app.get('/error', (req, res) => {
    res.render('error');
})

app.listen(port, () => {
    console.log('Listening on', port);
})