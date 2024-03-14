const validateSessionUser = async (req, res, next) => {
    let usermail = req.user.mailId;
    console.log("mail id in session", usermail);
    let usr = await userModel.getUserWithMail(usermail)
    if(!usr) {
        throw new ApiError(httpStatus.UNAUTHORIZED, `session mail ${usermail} is not valid`)
    }
    next()
}

module.exports = validateSessionUser