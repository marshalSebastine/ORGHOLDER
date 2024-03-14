
const userModel = require("../db/db.user");
const orgModel = require("../db/db.organisation");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const isUserValid = async (username, password) => {
    const user = await userModel.getUserWithMail(username);
    if(user && password === user.password) {
        return user
    } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, `Incorrect username or password`)
    }
};

const addUser = async(user, org) => {
    user.priviliges = org.roles[user.role].priviliges;
    let insertRes = await userModel.insertUser(user);
    if(!insertRes.acknowledged) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error inserting user document')
    }
    return insertRes
}

const updateOrgWithUserId = async (usrId, orgId) => {
    try {
        let res =  await orgModel.updateOrgWithUserId(usrId, orgId);
        return res
    } catch (er) {
        return false
    }
}



module.exports = { isUserValid, addUser, updateOrgWithUserId } 

