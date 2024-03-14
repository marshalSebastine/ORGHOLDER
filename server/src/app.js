const dotenv = require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const authRoutes = require('./routes/auth.route');
const orgRoutes = require("./routes/orgs.route");
const { convertErrorToApiError, errorHandler } = require('./middlewares/error');
const sessionConfig = require('../config/sessionConfig');
const app = express()
const passport = require("passport");
const cors = require('cors');
const path = require("path");

// set security HTTP headers
// app.use(helmet())

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let dir = path.resolve(__dirname, '..', '..');
let buildFolder = path.resolve(dir, 'client', 'build')
app.use(express.static(buildFolder));




// setting up express-session 
console.log("setting up express session", sessionConfig)
app.use(session(sessionConfig))
app.use(passport.authenticate('session'));

// middleware to check for anti-csrf token in requests
// app.use(csrf(config.csrfsecret)) 

//setting up routes
app.use('/auth',authRoutes)
app.use('/org',orgRoutes)

app.get('*', (req, res) => {
    let dir = path.resolve(__dirname, '..', '..');
    let staticFolder = path.resolve(dir, 'client', 'build', 'index.html')
    res.sendFile(staticFolder);
});
    

// app.use((req,res,next) => {
//     next(new ApiError(httpStatus.NOT_FOUND,"no such endpoint"))
// })

app.use(convertErrorToApiError)

app.use(errorHandler)

module.exports = app