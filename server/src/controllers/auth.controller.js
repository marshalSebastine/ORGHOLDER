const {isUserValid, addUser, updateOrgWithUserId} = require("../services/auth.service");
const userModel = require("../db/db.user");
const orgModel = require("../db/db.organisation");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const login =  (username, password, cb) => {

    isUserValid(username, password).then( user => {
        return cb(null, user);
    }).catch(er => {
        return cb(er)
    })

}

const signUp = async (req, res, next) => {
    let user = req.body.user
    let usrqry = await userModel.getUserWithMail(user.mailId);
    if(usrqry) {
        throw new ApiError(httpStatus.CONFLICT, `given mailid user already exists`)
    }
    let org = await orgModel.getOrgByName(user.organisationName);
    if (!org) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'invalid company name');
    }
    // adds to user document with prviliges field set from org
    let userRes = await addUser(user, org)
    let orgres = await updateOrgWithUserId(userRes.insertedId, org._id);
    // error updating org with user id delete the user
    if(!orgres) {
        await userModel.deleteUser(userRes.insertedId);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'deleted user on failure to add userid to org doc')
    }
    res.status(httpStatus.OK).json({ message: 'signup successful'}); 

}

module.exports = {login, signUp}