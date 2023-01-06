var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash=require('express-flash')
const session=require('express-session')
const passport=require('passport')
const methodOverride=require('method-override')
const dotenv=require('dotenv')

dotenv.config()



var teacherRoutes = require('./routes/teacherRoutes');
var studentRoutes = require('./routes/studentRoutes');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//express layout
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', "layouts/layout");
app.use(flash())
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false

}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);

app.get("/",(req,res)=>{
  res.render("index")
})


//DB connection 
const {connection}=require('./database/connection')
connection();
app.delete('/logout',(req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('teacher/login');
  });
  
})

app.use(express.json())
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
