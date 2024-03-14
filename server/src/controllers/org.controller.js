const httpStatus = require("http-status");
const orgModel = require("../db/db.organisation");
const userModel = require("../db/db.user.js");
const { Privileges } = require("../../config/rolesAndPrevilges.config.js")
const ApiError = require("../utils/ApiError");
const {getAllUsersOfOrg} = require("../services/org.service.js");

const fetchRole = async (req, res, next) => {
    const orgName = req.query.orgName;
    let org = await orgModel.getOrgByName(orgName)
    if(!org) {
        throw new ApiError(httpStatus.NOT_FOUND, `${orgName} does not exist`)
    }
    res.status(httpStatus.OK).json({ roles: Object.keys(org.roles)}); 
}

const getOrgUsers = async (req, res, next) => {
    // check for privileges
    let usr  = req.user
    let privileges = usr.priviliges
    console.log("privileges of sesssion user is", privileges)
    if(privileges.includes(Privileges.readAllUsers)){
        let users = await getAllUsersOfOrg(usr.organisationName)
        res.status(httpStatus.OK).json({ users: users}); 
        console.log("users are ", users);
    } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, "user dont have privilge to read all org users")
    }
}




module.exports = {fetchRole, getOrgUsers};