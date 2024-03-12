const {isUserValid} = require("../services/auth.service");

const login =  (username, password, cb) => {

    isUserValid(username, password).then( user => {
        return cb(null, user);
    }).catch(er => {
        return cb(er)
    })

}

module.exports = {login}