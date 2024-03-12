const Joi = require('joi');
const psswdRegex = require("../utils/validation.utils");

const login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(psswdRegex)).required(),
    }).required(),
    params: Joi.object().keys({
        organisation: Joi.string().required(),
      }).required(),
}
    
module.exports = {login}