const express = require('express');
const validateRequest = require('../middlewares/validate');
const catchAsync = require("../utils/catchWrapper.utils")
const validateUsrSession = require("../middlewares/validateUserSession");
const orgController = require("../controllers/org.controller");
const router = express.Router();
const {getOrgRole} = require("../validations/org.validaton");

router.get('/roles',validateRequest(getOrgRole),catchAsync(orgController.fetchRole))

// routes requiring valid session
router.get('/users',catchAsync(validateUsrSession), catchAsync(orgController.getOrgUsers))

module.exports = router