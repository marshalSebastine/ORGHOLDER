const express = require('express');
const validateRequest = require('../middlewares/validate');
const { login } = require('../validations/auth.validation');
const authController = require("../controllers/auth.controller");
var passport = require('passport');
var LocalStrategy = require('passport-local');

const router = express.Router();

passport.use(new LocalStrategy(authController.login));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { name: user.fullName, mailId: user.mailId });
    });
  });
  
passport.deserializeUser(function(user, cb) {
process.nextTick(function() {
    return cb(null, user);
});
});
// considered the case of login with email
router.post('/login',validateRequest(login),passport.authenticate('local'), (req, res) => {
    console.log("last wanted middlewarte callied")
    res.status(200).json({ message: 'Authentication successful', redirectUrl: `/home.html`});
  })

module.exports = router