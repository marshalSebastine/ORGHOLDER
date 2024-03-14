const Joi = require('joi');

const login = {
    body: Joi.object({
        username: Joi.string().email().required(),
        password: Joi.string(),
    }).required()
}

const signUp = {
    body: Joi.object({
        user: Joi.object({
            mailId: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            fullName: Joi.string(),
            organisationName: Joi.string().required(),
            role: Joi.string().required(),
            password: Joi.string().required()
        })
    })
}
    
module.exports = {login, signUp}