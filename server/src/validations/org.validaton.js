const Joi = require('joi');

const getOrgRole = {
    query: Joi.object().keys({
        orgName: Joi.string().required(),
      })
}
    
module.exports = {getOrgRole}