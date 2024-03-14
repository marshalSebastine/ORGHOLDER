const express = require('express');
const validateRequest = require('../middlewares/validate');
const { login, signUp } = require('../validations/auth.validation');
const catchAsync = require("../utils/catchWrapper.utils")
const authController = require("../controllers/auth.controller");
var passport = require('passport');
var LocalStrategy = require('passport-local');
const httpStatus = require("http-status");
const router = express.Router();

passport.use(new LocalStrategy(authController.login));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user);
    });
  });
  
passport.deserializeUser(function(user, cb) {
process.nextTick(function() {
    return cb(null, user);
});
});

router.post('/login',validateRequest(login),passport.authenticate('local'), (req, res) => {
    res.status(httpStatus.OK).json({ message: 'Authentication successful', user: req.user});
  })

router.post('/signup',validateRequest(signUp),catchAsync(authController.signUp))

module.exports = router