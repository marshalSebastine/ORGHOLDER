const userModel = require("../db/db.user");
const orgModel = require("../db/db.organisation");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const getAllUsersOfOrg = async (orgName) => {
    try {
        console.log("trying to get user of org", orgName)
        let org =  await orgModel.getOrgUsrsByName(orgName);
        if(org) {
            let users = await userModel.getUsersOfID(org.users);
            console.log("users from db for org", users)
            if(users) {
                return users
            } else {
                throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "error fecthing users from org");
            }
        } else {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "error getting orgnzation users");
        }
    } catch (er) {
        console.log("error on get users for org",er, orgName)
        return false
    }
}

module.exports = { getAllUsersOfOrg }