const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const authRoutes = require('./routes/auth.route');
const httpStatus = require("http-status");
const ApiError = require('./utils/ApiError');
const { convertErrorToApiError, errorHandler } = require('./middlewares/error');
const sessionConfig = require('../config/sessionConfig');
const app = express()


// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//use middlewares to sanitize db and script injection 

// setting up express-session 
console.log("setting up express session", sessionConfig)
app.use(session(sessionConfig))

// middleware to check for anti-csrf token in requests
// app.use(csrf(config.csrfsecret)) 

//setting up routes
app.use('/auth',authRoutes)


app.use((req,res,next) => {
    next(new ApiError(httpStatus.NOT_FOUND,"no such endpoint"))
})

app.use(convertErrorToApiError)

app.use(errorHandler)

module.exports = app