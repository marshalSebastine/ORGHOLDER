
var passport = require('passport');
const passportLoginMiddleware = (req, res, next) => {
    let org = req.params.organisation
    return passport.authenticate('local', {
    failureRedirect: `/auth/login/${org}`
  })}

module.exports = passportLoginMiddleware