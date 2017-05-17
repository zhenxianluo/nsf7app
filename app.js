var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var pug = require('pug');
var express = require('express');
var session = require('express-session');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'keyboard cat',
	cookie: {maxAge: 10 * 24 * 60 * 60 * 1000},
	resave: true,
	saveUninitialized: true
}));

var routes = require('./route/routes');
routes(app);

module.exports = app;
