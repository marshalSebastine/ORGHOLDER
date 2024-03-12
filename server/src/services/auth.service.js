
const userModel = require("../db/db.user");
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



module.exports = { isUserValid } 

