const Joi = require('joi');
const psswdRegex = require("../utils/validation.utils");

const login = {
    body: Joi.object({
        username: Joi.string().email().required(),
        password: Joi.string(),
    }).required(),
    params: Joi.object().keys({
        organisation: Joi.string().required(),
      }).required(),
}
    
module.exports = {login}