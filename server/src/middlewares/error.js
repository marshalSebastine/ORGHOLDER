const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const config = require("../../config/appconfig");

const convertErrorToApiError = (err, req, res, next) => {
    let error = err
    if (!(error instanceof ApiError)) {
        let message = error.message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
        error = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message, false, error.stack);
    }
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let response = {
        code: err.statusCode,
        message: err.message,
        ...(config.env == "development" && { stackTrace: err.stack })
    }
    res.status(err.statusCode).send(response);
}

module.exports = { errorHandler, convertErrorToApiError }