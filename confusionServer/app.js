var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var autenticate = require('./authenticate');
var config = require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');
mongoose.promie = require('bluebird');

const Dishes = require('./models/dishes');
const Promotions = require('./models/promotions');
const Leaders = require('./models/leaders');

//const url = 'mongodb://localhost:27017/conFusion';
const url = config.mongoUrl;
const connect = mongoose.connect(url, {});

connect.then((db) => {
  var dbs = mongoose.connection;
  console.log('Connected correctly to server');
}, (err) => { console.log("ERRR ", err);} );

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));
// app.use(session({
//   name: 'session-id',
//   secret: '12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }));

app.use(passport.initialize());
// app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// function auth (req, res, next) {
//  console.log(req.session);
//   // if (!req.session.user){
//     if (!req.user){
//         var err = new Error('You are not authenticated!');
//         res.setHeader('WWW-Authenticate', 'Basic');
//         err.status = 403;
//         next(err);
//         return;
//   } 
//   else {
//       next();
//   }
// }
// app.use(auth);


app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
