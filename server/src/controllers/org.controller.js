const httpStatus = require("http-status");
const orgModel = require("../db/db.organisation");
const userModel = require("../db/db.user.js");
const ApiError = require("../utils/ApiError");

const fetchRole = async (req, res, next) => {
    const orgName = req.query.orgName;
    let org = await orgModel.getOrgByName(orgName)
    if(!org) {
        throw new ApiError(httpStatus.NOT_FOUND, `${orgName} does not exist`)
    }
    res.status(httpStatus.OK).json({ roles: Object.keys(org.roles)}); 
}

const getOrgUsers = async (req, res, next) => {

}




module.exports = {fetchRole, getOrgUsers};