// All those packages we installed as specified in our backend/package.json
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');


// isProduction will be true if the environment is in production
// according to the configuration file
const { environment } = require('./config');
const isProduction = environment === 'production';

// Initialize the Express application
const app = express();

// Connect the morgan middleware for logging info about requests and responses
app.use(morgan('dev'));

// Add the cookie-parser middleware for parsing cookies and
// the express.json middleware for parsing JSON bodies of requests
app.use(cookieParser());
app.use(express.json());



// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

// The csurf middleware will add a _csrf cookie that is HTTP-only (can't be read by JavaScript) to any server response.
// It also adds a method on all requests (req.csrfToken) that will be set to another cookie (XSRF-TOKEN) later on.
// These two cookies work together to provide CSRF (Cross-Site Request Forgery) protection for your application.
// The XSRF-TOKEN cookie value needs to be sent in the header of any request with all HTTP verbs besides GET.
// This header will be used to validate the _csrf cookie to confirm that the request comes from your site and not an unauthorized site.
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );


// Connect all the routes
const routes = require('./routes');
app.use(routes);


// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });


  // Sequelize error handler
  app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });


// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);

    // Add properties to the formatted error response
    const responseObj = {}

    if (err.title) responseObj.title = err.title;
    if (err.message) responseObj.message = err.message;
    if (err.errors) responseObj.errors = err.errors

    // Add stack if not production
    if (!isProduction) {
      responseObj.stack = err.stack;
    }

    res.json(responseObj);
  });


  module.exports = app;
