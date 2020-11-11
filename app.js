const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
// var jwt = require('jsonwebtoken');

var redis = require('redis');
var JWTR =  require('jwt-redis').default;
//ES6 import JWTR from 'jwt-redis';
var redisClient = redis.createClient({
  port      : process.env.REDIS_PORT,
  host      : process.env.REDIS_HOST,
  password: process.env.REDIS_PASS
});
var jwt = new JWTR(redisClient);
 

const UserController = require('./Controllers/User.Controller');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Login
app.post('/user/auth', UserController.userLoginCheck);

//Logout User
app.post('/user/logout', function(req, res) {
  res.send( jwt.destroy( req.body.id, process.env.SECRET) );
})

app.use(function (req, res, next) {
  var token = req.headers['x-access-token'];
  if ( ! token ) {
    next( {
      status : 401,
      message: 'No token provided.' 
    });
  }

  jwt.verify(token, process.env.SECRET ).then( ( response ) => {
    next();
  }).catch( ( err ) => {
    next( {
      status : 401,
      message : err.message ? err.message : 'Expired token please make a new auth.'
    });
  });

});


// Initialize DB
require('./initDB')();

const ClientRoute = require('./Routes/Client.route');
const ProjectRoute = require('./Routes/Project.route');
const UserRoute = require('./Routes/User.route');
const OrganizationRoute = require('./Routes/Organization.route');
const TimeSheetRoute = require('./Routes/TimeSheet.route');

app.use('/clients', ClientRoute);
app.use('/projects', ProjectRoute);
app.use('/users', UserRoute);
app.use('/organizations', OrganizationRoute);
app.use('/timesheets', TimeSheetRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
  /*
  const err = new Error('Not found');
  err.status = 404;
  next(err);
  */
  // You can use the above code if your not using the http-errors module
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});