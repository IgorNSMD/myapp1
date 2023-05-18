var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mysql = require('mysql');
const fs = require('fs');


var app = express();

var config =
{
    host: 'mysql-ism-2-server.mysql.database.azure.com',
    user: 'mysqlism',
    password: 'Is@nmartin40',
    database: 'bienesraices',
    port: 3306,
    ssl: {ca: fs.readFileSync(__dirname + '/config/ssl/DigiCertGlobalRootCA.crt.pem')}
};


const conn = new mysql.createConnection(config);

conn.connect(
  function (err) { 
  if (err) { 
      console.log("!!! Cannot connect !!! Error:");
      throw err;
  }
  else
  {
     console.log("Connection established.");
         queryDatabase();
  }
});



function queryDatabase(){
  conn.query('DROP TABLE IF EXISTS inventory;', function (err, results, fields) { 
      if (err) throw err; 
      console.log('Dropped inventory table if existed.');
  })
      conn.query('CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);', 
          function (err, results, fields) {
              if (err) throw err;
      console.log('Created inventory table.');
  })
  conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['banana', 150], 
          function (err, results, fields) {
              if (err) throw err;
      else console.log('Inserted ' + results.affectedRows + ' row(s).');
      })
  conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['orange', 154], 
          function (err, results, fields) {
              if (err) throw err;
      console.log('Inserted ' + results.affectedRows + ' row(s).');
      })
  conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['apple', 100], 
  function (err, results, fields) {
              if (err) throw err;
      console.log('Inserted ' + results.affectedRows + ' row(s).');
      })
  conn.end(function (err) { 
  if (err) throw err;
  else  console.log('Done.') 
  });
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
