require('dotenv').config();

const path = require('path');
const express = require('express');
const authRouters = require('./routers/auth-routers');
const passportSetup = require('./config/strategies/google-strategy');

var exphbs  = require('express-handlebars');
 
var app = express();

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development' 

const knexFile = require('./knexfile')[NODE_ENV]
console.log(knexFile);
const knex = require('knex')(knexFile)

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'})
);

app.set('view engine', '.hbs');

//set up routes
app.use('/auth', authRouters);

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log('Listening on', port);
})