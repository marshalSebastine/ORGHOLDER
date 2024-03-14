const Joi = require("joi");

const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { pick } = require("../utils/validation.utils");
// TODO:- make the middleware capable of throwing specific validation http status code and response 
// eg. throw error with status code 422 and message 'email value must be string value not number value'
const validateRequest = (schema) => (req,res,next) => {
    const validSchema = pick(schema,['body','params','query']);
    //validate schema. throw error if not ok
    const obj = pick(req,Object.keys(validSchema))
    
    const {error , value} = Joi.compile(validSchema).prefs({
        abortEarly: false,
        errors: {label: "key"}
    }).validate(obj)

    if(error){
        const errorMessage = error.details.map((er) => er.message).join(", ")
        return next(new ApiError(httpStatus.BAD_REQUEST,errorMessage))
    }
    next()
}


module.exports = validateRequest